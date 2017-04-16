storage=Storages.localStorage;
// storage.set('api_server', 'http://80.241.40.218:65040');
storage.set('api_server', 'http://localhost:65040');


// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.run(['$http', '$q', function ($http, $q) {
    if (storage.get('auth_token') != null) {
        $.ajaxSetup({
            headers: {'Authorization': 'Bearer ' + storage.get('auth_token')}
        });
        $http.defaults.headers.common.Authorization = 'Bearer ' + storage.get('auth_token');
    }
    //console.log(storage.get('auth_token'));
}]);

$( document ).ajaxStart(function() {
    $( "#loading" ).show();
});
$( document ).ajaxStop(function() {
    $( "#loading" ).hide();
});

$( document ).ajaxComplete(function(event, data) {
    if (data.status == 401) {
        storage.set('auth_token', null);
        location.href = '/#login';
    }
});
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

        // route для главной страницы
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })

        // route для Объектов
        .when('/objects', {
            templateUrl : 'pages/objects.html',
            controller  : 'objectsController'
        })

        // route для страницы создания проекта
        .when('/project/create', {
            templateUrl : 'pages/createProject.html',
            controller  : 'createProjectController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        })

        // route for the contact page
        .when('/login', {
            templateUrl : 'pages/login.html',
            controller  : 'loginController'
        })

        // route for the contact page
        .when('/subtask', {
            templateUrl : 'pages/subtask.html',
            controller  : 'subtaskController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('homeController', function($scope, $http) {
    js_check_auth();
    if (storage.get('auth_token') != null) {
        $.ajaxSetup({
            headers: {'Authorization': 'Bearer ' + storage.get('auth_token')}
        });

    }
    //storage.set('auth_token', null);
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';

    $scope.logOut = function(){
        storage.set('auth_token', null);
        location.href = '/#login';
    };
    $.ajax({
        url: storage.get('api_server') + '/api/object_template/category/list',
        type: 'GET'
    }).done(function (data) {
        //alert(data);
        $scope.$apply(function() {
            $scope.object_categories = data;
            $scope.message = 'aefaefawe';
        });
        //console.log($scope);
    });

    assets_js_script();
});


// create the controller and inject Angular's $scope
scotchApp.controller('objectsController', function($scope, $http) {
    js_check_auth();
    $scope.files_documents = [];
    $scope.files_instructions = [];
    if (storage.get('auth_token') != null) {
        $.ajaxSetup({
            headers: {'Authorization': 'Bearer ' + storage.get('auth_token')}
        });

    }
    //storage.set('auth_token', null);
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.showObjects = function($event, id){
        //console.log(angular.element($event.target).parent().find('items').html("asdasdss") );
        $.ajax({
            url: storage.get('api_server') + '/api/object_template/list/' + id,
            type: 'GET'
        }).done(function (data) {
            //console.log(data);
            $scope.$apply(function() {
                $scope.object_templates = data;
                $scope.object_categories.forEach(function(elem, index) {
                    if (elem.id == id) {
                        $scope.object_categories[index].class = "opened";
                    } else {
                        $scope.object_categories[index].class = "";
                    }
                });
            });
            //console.log($scope);
        });
    };
    $scope.getObjectCategoryClass = function(value) {
        return "opened";
    };
    $scope.chooseObject = function($event, $id) {
        $.ajax({
            url: storage.get('api_server') + '/api/object_template/' + $id,
            type: 'GET'
        }).done(function (data) {
            //console.log(data);
            if (data.object_template.length == 1) {
                $scope.$apply(function() {
                    $scope.object_template = data.object_template[0];
                    $scope.object_categories1 = data.object_categories;
                    $scope.object_category = data.object_category;
                    //console.log(data.object_categories);
                    //console.log(data.object_category);
                    $scope.task_templates = data.task_templates;
                    //console.log($scope.task_templates);
                    $scope.task_templates1 = data.task_templates1;
                    $scope.files_documents = data.object_template_files;
                    console.log($scope.files_documents);
                    //console.log('task_templates', data.task_templates);
                });
            }
        });
        $scope.chosenTaskTemplate = null;
    };
    $scope.changeObjectCategory = function($event) {
        $.ajax({
            url: storage.get('api_server') + '/api/choose_object_template_category/',
            type: 'POST',
            data: {
                category_id: $scope.object_category,
                object_template_id: $scope.object_template.id
            }
        }).done(function (data) {
            //console.log(data);
            $.ajax({
                url: storage.get('api_server') + '/api/object_template/list/' + data,
                type: 'GET'
            }).done(function (data) {
                //console.log(data);
                $scope.$apply(function() {
                    $scope.object_templates = data;
                });
                //console.log($scope);
            });
        });
    };

    $scope.changeObjectName = function($event, $id) {
        if ($scope.object_template.name.length > 0) {
            $("#object_template_name_input").show();
            $("#object_template_name_button").show();
            $("#object_template_name_input").val($scope.object_template.name);
            $scope.object_object_template_name_temp = $scope.object_template.name;
            $scope.object_template.name = "";
        } else {
            if ($scope.object_object_template_name_temp) {
                $scope.object_template.name = $scope.object_object_template_name_temp;
                $("#object_template_name_input").hide();
                $("#object_template_name_button").hide();
                $("#object_template_name_input").val("");
            }
        }
    };
    $scope.confirmChangeObjectName = function() {
        if ($scope.object_template.name.length == 0) {
            $.ajax({
                url: storage.get('api_server') + '/api/change_object_template_name',
                type: 'POST',
                data: {object_template_id: $scope.object_template.id,
                       object_template_name: $("#object_template_name_input").val()}
            }).done(function (data) {
                $("#object_template_name_input").hide();
                $("#object_template_name_button").hide();
                $("#object_template_name_input").val("");
                $scope.$apply(function() {
                    $scope.object_object_template_name_temp = "";
                    $scope.object_template.name = data;
                    /*$scope.object_templates.forEach(function(elem, index) {
                        if (elem.id == $scope.object_template.id) {
                            $scope.object_templates[index] = $scope.object_template.name;
                        }
                    });*/
                    //$scope.object_templates = changeTaskTemplateName($scope.object_templates);
                });
                $.ajax({
                    url: storage.get('api_server') + '/api/object_template/list/' + $scope.object_template.category_id,
                    type: 'GET'
                }).done(function (data) {
                    //console.log(data);
                    $scope.$apply(function() {
                        $scope.object_templates = data;
                    });
                    //console.log($scope);
                });
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        }
    };
    $scope.changeObjectDescription = function($event, $id) {
        if ($scope.object_template.description.length > 0) {
            $("#object_template_desc_input").show();
            $("#object_template_desc_button").show();
            $("#object_template_desc_input").val($scope.object_template.description);
            $scope.object_object_template_description_temp = $scope.object_template.description;
            $scope.object_template.description = "";
        } else {
            if ($scope.object_object_template_description_temp) {
                $scope.object_template.description = $scope.object_object_template_description_temp;
                $("#object_template_desc_input").hide();
                $("#object_template_desc_button").hide();
                $("#object_template_desc_input").val("");
            }
        }
    };
    $scope.confirmChangeObjectDescription = function() {
        if ($scope.object_template.description.length == 0) {
            $.ajax({
                url: storage.get('api_server') + '/api/change_object_template_description',
                type: 'POST',
                data: {object_template_id: $scope.object_template.id,
                    object_template_description: $("#object_template_desc_input").val()}
            }).done(function (data) {
                $("#object_template_desc_input").hide();
                $("#object_template_desc_button").hide();
                $("#object_template_desc_input").val("");
                $scope.$apply(function() {
                    $scope.object_object_template_description_temp = "";
                    $scope.object_template.description = data;
                    $scope.object_templates.forEach(function(elem, index) {
                        if (elem.id == $scope.object_template.id) {
                            $scope.object_templates[index] = $scope.object_template.description;
                        }
                    });
                });
                $.ajax({
                    url: storage.get('api_server') + '/api/object_template/list/' + $scope.object_template.category_id,
                    type: 'GET'
                }).done(function (data) {
                    //console.log(data);
                    $scope.$apply(function() {
                        $scope.object_templates = data;
                    });
                    //console.log($scope);
                });
            }).fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        }
    };
    $scope.logOut = function(){
        storage.set('auth_token', null);
        location.href = '/#login';
    };
    $.ajax({
        url: storage.get('api_server') + '/api/object_template/category/list',
        type: 'GET'
    }).done(function (data) {
        //alert(data);
        $scope.$apply(function() {
            $scope.object_categories = data;
            $scope.message = 'aefaefawe';
        });
        //console.log($scope);
    });

    $scope.changeTaskName = function($id) {
        if ($scope.task_templates[$id].tempName == undefined) {
            $scope.task_templates[$id].tempName = $scope.task_templates[$id].name;
            $("#changeTaskNameInput" + $id).val($scope.task_templates[$id].name);
            $scope.task_templates[$id].name = "";
            $("#changeTaskNameInput" + $id).show();
            $("#changeTaskNameButton" + $id).show();
        } else {
            $scope.task_templates[$id].name = $scope.task_templates[$id].tempName;
            $("#changeTaskNameInput" + $id).val("");
            $scope.task_templates[$id].tempName = undefined;
            $("#changeTaskNameInput" + $id).hide();
            $("#changeTaskNameButton" + $id).hide();
        }
    };

    $scope.changeTaskNameConfirm = function($id) {
        $.ajax({
            url: storage.get('api_server') + '/api/change_task_name',
            type: 'POST',
            data: {
                task_id: $id,
                task_name: $("#changeTaskNameInput" + $id).val()
            }
        }).done(function (data) {
            $scope.$apply(function() {
                $("#changeTaskNameInput" + $id).val("");
                $scope.task_templates[$id].tempName = undefined;
                $("#changeTaskNameInput" + $id).hide();
                $("#changeTaskNameButton" + $id).hide();
                $scope.task_templates[$id].name = data;
                //console.log($scope.task_templates[$id]);
            });
        });
    };

    $scope.chooseTaskTemplate = function($id) {
        $scope.task_templates1.forEach(function (elem) {
            if (elem != null) {
                $scope.task_templates1[elem.id].class = "";
            }
        });
        $scope.task_templates1[$id].class = "active";
        $scope.chosenTaskTemplate = $scope.task_templates1[$id];
        if ($scope.chosenTaskTemplate.task_template_node_id != null) {
            $.ajax({
                url: storage.get('api_server') + '/api/task_template_node/' + $scope.chosenTaskTemplate.task_template_node_id,
                type: 'GET'
            }).done(function (data) {
                $scope.$apply(function() {
                    $scope.chosenTaskTemplate.node = data.task_template_node;
                    $scope.chosenTaskTemplate.node.roles = data.task_template_node_role;
                    $scope.all_roles = data.all_roles;
                    $scope.equipment = data.equipment;
                    $scope.role_list_show = "";
                    console.log($scope.chosenTaskTemplate.node.roles);
                });
                /*$scope.$apply(function() {
                    $scope.object_templates = data;
                });*/
                //console.log($scope);
            });
        }
    };

    $scope.showRolesDropDown = function() {
        if ($scope.role_list_show == "") {
            $scope.role_list_show = "show";
        } else {
            $scope.role_list_show = "";
        }
    };

    $scope.addRole = function($event, $node_id, $role_id) {
        $event.preventDefault();
        $.ajax({
            url: storage.get('api_server') + '/api/add_role_to_task_template',
            type: 'POST',
            data: {
                node_id: $node_id,
                role_id: $role_id
            }
        }).done(function (data) {
            //console.log(data);
            $scope.$apply(function() {
                //console.log($scope.chosenTaskTemplate.node.roles);
                //console.log(data);
                $scope.chosenTaskTemplate.node.roles = data;
                $scope.role_list_show = "";
            });
        });
    };

    $scope.getTaskClass = function($id) {
        return $scope.task_templates1[$id].class;
    };

    $scope.getTaskOpenedClass = function($id) {
        if ($scope.task_templates1[$id].task_template_node_id == null) {
            if ($scope.task_templates1[$id].is_opened == undefined || $scope.task_templates1[$id].is_opened == false) {
                return "bpmicon-triangle-down";
            } else if ($scope.task_templates1[$id].is_opened == true) {
                return "bpmicon-triangle-up";
            }
        }
    };
    $scope.getSubtasksOpenedClass = function($id) {
        if ($scope.task_templates1[$id].is_opened == undefined || $scope.task_templates1[$id].is_opened == false) {
            return "elem-hidden";
        } else if ($scope.task_templates1[$id].is_opened == true) {
            return "";
        }
    };
    $scope.showSubtasks = function($id) {
        if ($scope.task_templates1[$id].is_opened) {
            $scope.task_templates1[$id].is_opened = false;
        } else {
            $scope.task_templates1[$id].is_opened = true;
        }

    };

    function getFirstTaskTemplateParentId($id) {
        if ($scope.task_templates1[$id].parent_id != null) {
            return getFirstTaskTemplateParentId($scope.task_templates1[$id].parent_id);
        } else {
            return $scope.task_templates1[$id].id;
        }
    }

    $scope.getFirstTaskTemplateParentId = function($id) {
        return getFirstTaskTemplateParentId($id);
    };

    $scope.setTaskTemplatePriority = function() {
        $.ajax({
            url: storage.get('api_server') + '/api/change_task_template_priority',
            type: 'POST',
            data: {task_template_node_id: $scope.chosenTaskTemplate.task_template_node_id,
                task_template_node_priority: $('#new_task_template_priority').val()}
        }).done(function (data) {
            $scope.$apply(function() {
                $scope.chosenTaskTemplate.node.priority = data;
            });
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    };

    $scope.setTaskTemplatePhotoNum = function() {
        $.ajax({
            url: storage.get('api_server') + '/api/change_task_template_photo_num',
            type: 'POST',
            data: {task_template_node_id: $scope.chosenTaskTemplate.task_template_node_id,
                task_template_node_photo_num: $('#new_task_template_photo_num').val()}
        }).done(function (data) {
            $scope.$apply(function() {
                $scope.chosenTaskTemplate.node.photo_number = data;
            });
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    };

    $scope.setTaskTemplateDuration = function() {
        $.ajax({
            url: storage.get('api_server') + '/api/change_task_template_duration',
            type: 'POST',
            data: {task_template_node_id: $scope.chosenTaskTemplate.task_template_node_id,
                task_template_node_duration: $('#new_task_template_duration').val()}
        }).done(function (data) {
            $scope.$apply(function() {
                $scope.chosenTaskTemplate.node.duration = data;
            });
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    };

    $scope.changeTaskTemplateName = function() {
        //console.log($scope);
        if ($scope.chosenTaskTemplate != null) {
            if ($scope.chosenTaskTemplate.temp_name == undefined || $scope.chosenTaskTemplate.temp_name == null || $scope.chosenTaskTemplate.temp_name == "") {
                //alert($scope.chosenTaskTemplate.name);
                $('#changeTaskTemplateNameInput').val($scope.chosenTaskTemplate.name);
                $scope.chosenTaskTemplate.temp_name = $scope.chosenTaskTemplate.name;
                $scope.chosenTaskTemplate.name = "";
                $('#changeTaskTemplateNameInput').show();
                $('#changeTaskTemplateNameButton').show();
            } else {
                $scope.chosenTaskTemplate.name = $scope.chosenTaskTemplate.temp_name;
                $scope.chosenTaskTemplate.temp_name = null;
                $('#changeTaskTemplateNameInput').val("");
                $('#changeTaskTemplateNameInput').hide();
                $('#changeTaskTemplateNameButton').hide();
            }
        }
    };

    $scope.confirmChangeTaskTemplateName = function() {
        //alert($('#changeTaskTemplateNameInput').val());
        $.ajax({
            url: storage.get('api_server') + '/api/change_task_template_name',
            type: 'POST',
            data: {task_template_id: $scope.chosenTaskTemplate.id,
                task_template_name: $('#changeTaskTemplateNameInput').val()}
        }).done(function (data) {
            $scope.$apply(function() {
                $scope.chosenTaskTemplate.name = data;
                $scope.chosenTaskTemplate.temp_name = null;
                $scope.task_templates = changeTaskTemplateNameRec($scope.task_templates, $scope.chosenTaskTemplate.id, $scope.chosenTaskTemplate.name);
            });
            $('#changeTaskTemplateNameInput').val("");
            $('#changeTaskTemplateNameInput').hide();
            $('#changeTaskTemplateNameButton').hide();
            function changeTaskTemplateNameRec(task_templates, id, name) {
                task_templates.forEach(function(element, index) {
                    if (element != null) {
                        if (task_templates[index].id == id) {
                            task_templates[index].name = name;
                        } else {
                            if (element.children.length > 0) {
                                element.children = changeTaskTemplateNameRec(element.children, id, name);
                            }
                        }
                    }
                });
                return task_templates;
            };
            $.ajax({
                url: storage.get('api_server') + '/api/object_template/list/' + $scope.object_template.category_id,
                type: 'GET'
            }).done(function (data) {
                //console.log(data);
                $scope.$apply(function() {
                    $scope.object_templates = data;
                });
                //console.log($scope);
            });
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    };

    $scope.deleteEquipmentFromTaskTemplate = function($id) {
        var decision = confirm("Вы действительно хотите удалить Оборудование?");
        if (decision) {
            $.ajax({
                url: storage.get('api_server') + '/api/delete_equipment_from_task_template',
                type: 'POST',
                data: {
                    object_template_equipment_id: $id
                }
            }).done(function (data) {
                $scope.$apply(function () {
                    $scope.equipment.forEach(function (item, index) {
                        if (item.id == $id) {
                            $scope.equipment.splice(index, 1);
                        }
                    });
                });
                console.log($scope.equipment);
            }).fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    };

    $scope.addNewTaskTemplateEquipment = function() {
        console.log($("#new_task_template_equipment_name").val());
        console.log($("#new_task_template_equipment_amount").val());
        console.log($scope.chosenTaskTemplate.id);
        $.ajax({
            url: storage.get('api_server') + '/api/add_new_equipment_to_task_template',
            type: 'POST',
            data: {
                task_template_node_id: $scope.chosenTaskTemplate.node.id,
                name: $("#new_task_template_equipment_name").val(),
                amount: $("#new_task_template_equipment_amount").val()
            }
        }).done(function (data) {
            console.log($scope.equipment);
            $scope.$apply(function() {
                $scope.equipment.push(data);
            });
            $("#new_task_template_equipment_name").val("");
            $("#new_task_template_equipment_amount").val("");
        }).fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    };

    $scope.showDocumentChooseDialog = function(){
        $("#documentsFileInput").click();
    };

    $scope.showInstructionChooseDialog = function(){
        $("#instructionsFileInput").click();
    };


    $scope.documentChosen = function(){
        if($("#documentsFileInput")[0].files.length > 0){
            /*$.ajax({
                url: storage.get('api_server') + '/api/upload_object_document/',
                type: 'POST',
                data: {
                    document: $("#documentsFileInput")[0].files[0]
                },
                contentType: 'multipart/form-data'
            }).done(function (data) {
                $scope.$apply(function() {
                    $scope.files_documents.push({selected:"", file:$("#documentsFileInput")[0].files[0]});
                });
            });*/

            var formData = new FormData();
            formData.append("file", $("#documentsFileInput")[0].files[0]);
            formData.append("object_id", $scope.object_template.id);
            $.ajax({
                url: storage.get('api_server') + '/api/upload_object_document',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    console.log(data);
                    $scope.$apply(function() {
                        $scope.files_documents.push({selected:"", file:$("#documentsFileInput")[0].files[0]});
                        console.log($scope.files_documents);
                    });
                }
            });
            /*if(formData.object_document.fake) {
                // Make sure no text encoding stuff is done by xhr
                opts.xhr = function() { var xhr = jQuery.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; }
                opts.contentType = "multipart/form-data; boundary="+data.boundary;
                opts.data = data.toString();
            }*/
            console.log($scope.files);
        }
    };


    $scope.instructionChosen = function(){
        if($("#instructionsFileInput")[0].files.length > 0){
            $scope.$apply(function() {
                $scope.files_instructions.push({selected:"", file:$("#instructionsFileInput")[0].files[0]});
            });
        }
    };

    $scope.deleteDocumentFile = function(index){
        $scope.files_documents.splice(index,1);
    };

    $scope.previewDocumentFile = function(index){
        clearSelectedFiles($scope.files_documents);
        $scope.files_documents[index].selected="selected";
        var test = window.open();
        if ($scope.files_documents[index].file.path) {
            test.location = storage.get('api_server') + '/api/get_file/' + $scope.files_documents[index].file.file_hash;
        } else {
            test.location = URL.createObjectURL($scope.files_documents[index].file);
        }
    };

    $scope.deleteInstructionFile = function(index){
        $scope.files_instructions.splice(index,1);
    };

    $scope.previewInstructionFile = function(index){
        clearSelectedFiles($scope.files_instructions);
        $scope.files_instructions[index].selected="selected";
        pdfViewer.src = URL.createObjectURL($scope.files_instructions[index].file);
    };

    assets_js_script();

});

scotchApp.controller('aboutController', function($scope) {
    js_check_auth();
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    js_check_auth();
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('loginController', function($scope) {
    js_check_auth();
    $scope.message = 'Авторизация';
    js_login();
});

scotchApp.controller('createProjectController', function($scope) {
    js_check_auth();
    //call ajax requests to fill objects' list, snabzhenecs' list, rukovoditels' list
    $scope.files = [];
    $scope.objects = [{selected:"",name:"Doma 2", hrs:12,teams:[{name:"team1"},{name:"team2"}]},
                        {selected:"",name:"TP1", hrs:45,teams:[{name:"team2"},{name:"team4"}]}];
    $scope.snabs = [];
    $scope.selectedOjectIndex = null;
    $scope.selectedSnabIndex = null;

    $scope.selectObject = function(snabIndex){
        clearSelectedObjects($scope.objects);
        $scope.objects[snabIndex].selected = "selected";
        $scope.selectedOjectIndex = snabIndex;
    };
    $scope.showFileChooseDialog= function(){
        $("#documentFileInput").click();
    };


    $scope.fileChoosen = function(){
        if($("#documentFileInput")[0].files.length > 0){
            $scope.$apply(function() {
                $scope.files.push({selected:"", file:$("#documentFileInput")[0].files[0]});
            });
            console.log($scope.files);

        }
    };
    $scope.deleteFile = function(index){
        $scope.files.splice(index,1);
    };
    $scope.previewFile = function(index){
        clearSelectedFiles($scope.files);
        $scope.files[index].selected="selected";
        pdfViewer.src = URL.createObjectURL($scope.files[index].file);
    };

    $scope.next = function(_id){
        select_tab(_id);    
    };

    $scope.finish = function(){
        alert("nea");
    };
    // select_tab('documents');
    $('.tab_header .item').click(function(){
        var alt = $(this).attr('alt');
        select_tab(alt);
    });
    $scope.message = 'Contact us! JK. This is just a demo.';
});
