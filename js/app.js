(function ($) {


// Define the models
Folder = Backbone.Model.extend();
File = Backbone.Model.extend();

// Define the collection
Folders = Backbone.Collection.extend(
    { 
        model: Folder,
        // Url to request when fetch() is called
        // url: 'http://search.twitter.com/search.json?q=Beyonce&rpp=5&lang=all&',
        url: 'proxy.php?',
        parse: function(response) {
            return response.folders;
        },
        // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
            
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);
              //console.log(params)
            return $.ajax(params);
        }
    });

Files = Backbone.Collection.extend(
    { 
        model: Folder,
        // Url to request when fetch() is called
        // url: 'http://search.twitter.com/search.json?q=Beyonce&rpp=5&lang=all&',
        url: 'proxy.php?',
        parse: function(response) {
            return response.files;
        },
        // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
            
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);
              //console.log(params)
            return $.ajax(params);
        }
    });
    
// Define the View
FoldersView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      // create a collection of Folders
      this.collection = new Folders();
      this.refresh = function () {
        var that = this;
        this.collection.fetch({
            data: $.param({ key: "myfiles", type: "fo", sessionToken: sessionToken}),
           success: function () {
               that.render();
           }
         });
            var app2 = new FilesView({
                // define the el where the view will render
                el: $('#files')
                
            });
            app2.collection.fetch({
                data: $.param({ key: "myfiles", type: "fi", sessionToken: sessionToken}),
                success: function () {
                    app2.render();
                }
            });         
      };
      // Fetch the collection and call render() method
        this.refresh();
    },
    // Use an extern template
    template: _.template($('#foldersTemplate').html()),

    render: function() {
       
        // Fill the html with the template and the collection
        $(this.el).html(this.template({ folders: this.collection.toJSON() }));
    },
    events: {
            "click a": "getFolder"
        },
        getFolder: function( event ){
            //this.refresh();
            var id = $(event.currentTarget).data("id");  var name = $(event.currentTarget).data("name");
            var that = this;
            this.collection.fetch({
                data: $.param({ key: id, type: "fo", sessionToken: sessionToken}),
                success: function () {
                    that.render();
                }
            });

            var app2 = new FilesView({
                // define the el where the view will render
                el: $('#files')
                
            });
            app2.collection.fetch({
                data: $.param({ key: id, type: "fi", sessionToken: sessionToken}),
                success: function () {
                    app2.render();
                }
            });
        }        
});

FilesView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      // create a collection of Folders
      this.collection = new Files();
      this.refresh = function () {
        var that = this;
        this.collection.fetch({
            //data: $.param({ key: "myfiles", type: "fi", sessionToken: sessionToken}),
           success: function () {
               that.render();
           }
         });
      };
      // Fetch the collection and call render() method
        this.refresh()
    },
    // Use an extern template
    template: _.template($('#filesTemplate').html()),

    render: function() {
        // Fill the html with the template and the collection
        $(this.el).html(this.template({ files: this.collection.toJSON() }));
    },
    events: {
            "click a": "getFile"
        },
        getFile: function( event ){
            //this.refresh();
            var id = $(event.currentTarget).data("id");  var filename = $(event.currentTarget).data("filename");
            var that = this;
             $.get('getPlayer.php?key='+id, function(data) {
                $('div#playerContainer').show();
                 $('div#playerContainer').html(data);
                 $('div#playerContainer p#title').html(filename);
                
              });
            console.log('loaded '+filename)
        }            
});

var app = new FoldersView({
    // define the el where the view will render
    el: $('#folders')
});


//ROUTER
// update view with router request. http://jsfiddle.net/avrelian/dGr8Y/
    var AppRouter = Backbone.Router.extend({
        routes: {
            "folder/:id": "getFolder",
            "*actions": "defaultRoute" // Backbone will try match the route above first
        }
    });
    // Instantiate the router
    var app_router = new AppRouter;
    app_router.on('route:getFolder', function (id) {
        // Note the variable in the route definition being passed in here
        console.log( "Get folder " + id ); 
        //posts.fetch({data: $.param(filters)});
            var app = new FoldersView({
                el: $('#folders')
            });
            app.collection.fetch({
                data: $.param({ key: id, type: "fo", sessionToken: sessionToken}),
                success: function () {
                    app.render();
                }
            });     
            var app2 = new FilesView({
                el: $('#files')
            });
            app2.collection.fetch({
                data: $.param({ key: id, type: "fi", sessionToken: sessionToken}),
                success: function () {
                    app2.render();
                }
            });            
    });
    app_router.on('route:defaultRoute', function (actions) {
       // console.log( actions ); 
    });
    // Start Backbone history a necessary step for bookmarkable URL's
//    Backbone.emulateHTTP = true;
//    Backbone.emulateJSON = true; 
    Backbone.history.start();


} (jQuery));
