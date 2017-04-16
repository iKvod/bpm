//Project creation page, tab switcher funciton
function select_tab(alt) {
    $('.tab_contents .content_item').hide();
    $('.tab_header .item').removeClass('active');
    $('#'+alt+'_tab').addClass('active');
    $('#'+alt).show();
}

//To clear selected class of all files
function clearSelectedFiles(files){
	for(var i=0; i<files.length; i++){
		files[i].selected = "";
	}
}

//To clear selected class of all objs
function clearSelectedObjects(objs){
	for(var i=0; i<objs.length; i++){
		objs[i].selected = "";
	}
}