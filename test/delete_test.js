const assert = require("assert");
const User = require("./../src/user.js");

describe("Deleting a user ", () => {
  let newUser;

  beforeEach(done => {
    newUser = new User({ name: "Victor" });
    newUser.save().then(() => {
      done();
    });
  });

  it("model Instance remove", (done) => {
    //Use the instance  of Mongoose Model
    newUser
      .remove()
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class Method remove", (done) => {
    //Remove a bunch of records with some given criteria
    User.remove({ name: "Victor" })
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class Method findAndRemove", (done) => {
    //Very particular and remove. Can use for a very particular email for example
    User.findOneAndRemove({ name: "Victor" })
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it("class Method findByIdAndRemove", done => {
    User.findByIdAndRemove(newUser._id)
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
