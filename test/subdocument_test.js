const assert = require("assert");
const User = require("./../src/user.js");

describe("Subdocuments", () => {
  it("It can create a subdocument", done => {
    const newUser = new User({
      name: "Victor",
      posts: [{ title: "One Punch man" }]
    });

    newUser
      .save()
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(user.posts[0].title === "One Punch man");
        done();
      });
  });

  /*it('Can add subdocuments  to an existing record', done => {
    newUser = new User({
        name: 'Vicman',
        posts: []
    });

    newUser.save()
        .then( () => User.findOne({ name: 'Vicman'}) )
        .then( (user) => {
            user.posts.push({ title: 'Dragon Ball'});
            return user.save();
        })
        .then (() => User.findOne({name: 'Vicman'}))
        .then ( ( user ) => {
            assert( user.posts[0].title === 'Dragon Ball');
            done();
        }) 
    });*/

    it("Removing subdocuments to an existing records", done => {
        newUser = new User({
            name: "Victor",
            posts: [{ title: "One punch" }]
        });
        newUser.save()
            .then(() => User.findOne({name: 'Victor'})) 
            .then( (user)=>{
                user.posts[0].remove();
                return user.save();
            })
            .then( () => User.findOne({name: 'Victor'}))
            .then((user) => {
                assert ( user.posts.length === 0 );
                done();
            })
    });
});
