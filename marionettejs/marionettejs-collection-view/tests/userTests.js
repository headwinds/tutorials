define([
  'jquery',
  'underscore',
  'backbone',
  'views/user/UserEditView',
  'collections/user/UserCollection',
  'models/user/UserModel',
], function($, _, Backbone, UserEditView, UserCollection, UserModel ) {

    /*
    
    I want to test user managemet:

    1. can I create user data?
    2. can I update an existing user?
    3. can I delete a user?

    */

    describe('Edit User Tests', function () {

    ///////////////////////////////////////////////////////////////////////////////////// 1. create some data   

      describe('the userCollectionView, userModel, userCollection should be instantiated', function () {
        it('should be able to create a userCollectionView', function () {
            
            var userEditView = new UserEditView(); 
            userEditView.should.be.ok;

        });

        it('should be able to create a userModel', function () {
            
            var userModel = new UserModel(); 
            userModel.should.be.ok;

        });

         it('should be able to create a userCollection with no dummy data', function () {
            
            var userCollection = new UserCollection(); 
            userCollection.should.be.ok;

        });

        it('should be able to create a userCollection with 3 dummy models that I pass in at instantiation', function () {
            
            var model0 = new UserModel();
            var model1 = new UserModel({ name: "legolas", class: "archer", race: "elf"}); 
            var model2 = new UserModel({ name: "gandalf", class: "man", race: "wizard"}); 

            var models = [model0, model1, model2]; 

            var userCollection = new UserCollection( models );
            userCollection.models.should.have.lengthOf(3)

        }); 

         it('should be able to create a userCollection with 3 dummy models that are created internally', function () {
            
            var userCollection = new UserCollection();
            userCollection.createDummyData();  

            userCollection.models.should.have.lengthOf(3)

        }); 

        it('should be able to create a userEditView with a userCollection that has 3 dummy models that are created internally', function () {
            
            var userCollection = new UserCollection();
            userCollection.createDummyData();

            var userEditView = new UserEditView( {collection: userCollection} );

            userEditView.should.be.ok;
            userEditView.collection.models.should.have.lengthOf(3);

        }); 

      });
  
    
      ///////////////////////////////////////////////////////////////////////////////////// 2. update a model 
  
      // once I know this view and collection are ok, I can start re-using them...
      var userEditView = new UserEditView(); 
      var userCollection = new UserCollection(); 
      userCollection.createDummyData(); 

      describe('the userCollection should have users which I can find by name', function () {
        it('return a model with the name biblo', function () {
            
            var model = userCollection.findWhere({ name: "Biblo" }); 
            var name = model.get("name").toLowerCase(); 
            name.should.equal("biblo");

        });
       
      });

      describe('the userModel should be updated with new details', function () {
        it('should take new object and be saved in local storage', function () {

            var model = userCollection.findWhere({ name: "Biblo" }); 
            
            var updateObj = { name: "merry", class: "burglar", race: "hobbit" };

            model.save(updateObj);

            var userClass = model.get("class"); 
            userClass.should.equal("burglar");

        });
       
      });

    
      /////////////////////////////////////////////////////////////////////////////////////

    });
});
