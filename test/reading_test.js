const asssert = require('assert');
const User = require('./../src/user');

describe('Reading users from db', () => {
    let newUser;
    beforeEach((done) => {
        newUser = new User({name: 'Pamela'});
        newUser.save()
            .then( () => done() )    
    });

    it('find all users with name of Pamela ', (done) => {
        User.find({ name: 'Pamela'})
            .then( (users) => {
                console.log('userd.id', users[0].id);
                console.log('newUser._id',newUser._id);
                asssert(users [0]._id == newUser.id);
                done();
            })
    });

    it('Find an user with a particular Id', (done  ) => {
        User.findOne({ _id: newUser.id} )
            .then( (user) => {
                asssert(user.name == 'Pamela' );
                done();
            })
        
    });
});