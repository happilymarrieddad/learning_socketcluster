$(function() {

	var selectedFile = null;
	var fileReader = null;
	var oldHtml = null;

	observe('bind',function() {

	});

	observe('start',function() {
		
	});

	observe('build-profile',function() {
		notify('server',{
			route:'Users',
			resource:'getProfile',
			id:$('#user-id').val()
		});
	});

	observe('users-getProfile',function(data) {
		var user = data.user;

		$('#profile-div').empty().html(templatizer['profile']({
			user:user
		}));

		notify('bind-upload');

		$('section[data-route="profile"]').show();
		notify('finish-loading');
	});

	observe('bind-upload',function() {
		// Fire this function after the user selects an image
		$('#users-filebox').change(function(e) {
			selectedFile = e.target.files[0];
			// If the file is valid then remove the disabled attribute on the upload button
			if (selectedFile) $('#users-uploadbtn').attr('disabled',false);
			else $('#users-uploadbtn').attr('disabled',true);
			// Set the input with the current name
			$('#users-namebox').val(selectedFile.name);
		});

		// Fire this function when the user clicks the upload button.
		$('#users-uploadbtn').on('click',function() {
			// Last check to ensure there actually is a file there.
			if (selectedFile && selectedFile.name) {
				user_id = $(this).data('userid');
				fileReader = new FileReader();
				fileReader.user_id = user_id;
				fileReader.file_name = selectedFile.name;
				var content = 
					"<span id='users-namearea'>Uploading " + selectedFile.name + "</span>" +
		        	'<div id="users-progress-container"><div id="users-progress-bar"></div></div><span id="users-percent">0%</span>' +
		        	"<span id='users-uploaded'> - <span id='users-mb'>0</span>/" + Math.round(selectedFile.size / 1048576) + " MB</span>";
		        oldHtml = $('#users-uploadarea').html();
		        $('#users-uploadarea').html(content);
		        fileReader.onload = function(e) {
		        	notify('server', {
		        		route:'Services',
		        		resource:'upload',
		        		notify:'users-upload',
		        		name:e.target.file_name,
		        		data:e.target.result,
		        		user_id:e.target.user_id
		        	});
		        }
		        notify('server',{
		        	route:'Services',
		        	resource:'uploadStart',
		        	notify:'users-upload',
		        	name:selectedFile.name,
		        	size:selectedFile.size
		        });
			} else {
				$(this).attr(disabled,true);
			}
		});

	});

	observe('users-upload',function(data) {
		if (data.msg == 'moredata') {
			notify('users-upload-progress',data.percent || 100);
			var place = data.place * 524288;
			var newFile;
			if (selectedFile.webkitSlice) {
				newFile = selectedFile.webkitSlice(place,place + Math.min(524288, (selectedFile.size - place)));
			} else {
				newFile = selectedFile.slice(place,place + Math.min(524288, (selectedFile.size - place)));
			}
			fileReader.readAsBinaryString(newFile);
		} else if (data.msg == 'uploadingdone') {
			$('#users-uploadarea').html(oldHtml);
			notify('bind-upload');
		}
	});

	observe('users-upload-progress',function(percent) {
		$('#users-progress-bar').attr('style','width:' + percent + "%");
		$('#users-percent').html((Math.round(percent * 100) / 100) + " %");
		var mbDone = Math.round(((percent / 100.0) * selectedFile.size) / 1048576);
		$('#users-mb').html(mbDone);
	});

	observe('users-upload-create-finish',function(data) {
		$('#users-form-image').attr('src',(data.image ? data.image : '/images/default-user-image.png'));
	});

});