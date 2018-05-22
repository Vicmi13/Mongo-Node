const assert = require("assert");
const User = require("./../src/user.js");
describe("Virtual Types", () => {
  it("postCount return number of posts ", done => {
    const newUser = new User({
      name: "Victor",
      posts: [{ title: "One punch" }]
    });

    newUser.save()
      .then(() => User.findOne({ name: "Victor" }))
      .then(user => {
        assert(newUser.postCount === 1);
        done();
      });
  });
});
