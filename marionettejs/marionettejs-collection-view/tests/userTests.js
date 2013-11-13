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

    ///////////////////////////////////////////////////////////////////////////////////// CREATE  

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
  
    
      ///////////////////////////////////////////////////////////////////////////////////// UPDATE
  
      // once I know this view and collection are ok, I can start re-using them...
      var userEditView = new UserEditView(); 
      var userCollection = new UserCollection(); 
      userCollection.createDummyData(); 

      describe('the userCollection should have users which I can find by name', function () {
        it('should return a model with the name bilbo', function () {
            
            userCollection.should.be.ok;

            var heroName = "BiLBo";
            heroName = heroName.toLowerCase();

            console.log(userCollection);

            var model = userCollection.findWhere({ name: heroName }); // this could be an issue - need to ensure all lowercase names when set
            model.should.be.ok;

            var name = model.get("name").toLowerCase(); 
            name.should.equal("bilbo");

        });
       
      });

      describe('the userModel should be updated with new details', function () {
        it('should take in a new details object and be saved in local storage', function () {

            var model = userCollection.findWhere({ name: "bilbo" }); 
            
            var updateObj = { name: "merry", class: "burglar", race: "hobbit" };

            // ok can I handle async tests?! this seems to work but I'm sure I'm missing something?! perhaps mocha knows to wait...

            var saveResult = false; 
            var successCallback = function(){
              saveResult = true; 
            };

            var errorCallback = function(){
              console.debug("error saving updated model"); 
            };

            model.save(updateObj, {success: successCallback, error: errorCallback});

            var userClass = model.get("class"); 
            userClass.should.equal("burglar");
            
            saveResult.should.be.true; 

        });
       
      });

    
      ///////////////////////////////////////////////////////////////////////////////////// DELETE 

      describe('the userEditView is removed', function () {
        it('should be removed and all events should be unbound', function () {

            userEditView.should.ok;
            userEditView.remove(); 

            userEditView.should.be.null; 

        });
       
      });

    });
});
