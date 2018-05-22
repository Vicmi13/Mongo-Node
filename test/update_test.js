const assert = require("assert");
const User = require("./../src/user.js");

describe("Updating records", () => {
  let newUser;

  beforeEach(done => {
    newUser = User({ name: "Victor", likes : 0 });
    newUser.save().then(() => done());
  });

  function assertName(operation, done) {
    operation.then(() => {
      User.find({}).then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Miguel");
        done();
      });
    });
  }

  it("Instance type using 'set and save ' ", done => {
    newUser.set("name", "Miguel");
    assertName(newUser.save(), done);
    console.log("User modified", newUser);
  });

  it("A model instance can update", done => {
    assertName(newUser.update({ name: "Miguel" }), done);
  });

  /*it('A model class can Update', (done) => {
    assertName( User.update({name: 'Victor'}, {name : 'Vicman'}), done);
  });*/

  it('A model class can update one record', (done) => {
      assertName (
          User.findOneAndUpdate({name: 'Victor'}, {name: 'Miguel'}), done
      );
  });

  it('A model class can find a record with Id and Update', (done) => {
    assertName(
        User.findByIdAndUpdate(newUser._id , {name: 'Miguel'}), done
    );
  });

  it('A user can have their postCount incremented by 1', (done) => {
    User.update({name:'Victor'}, { $inc : { likes: 1} })
      .then( () => User.findOne ( {name: 'Victor'}))
      .then( (user) => {
        assert ( user.likes === 1 );
        done();
      })
  });

});
