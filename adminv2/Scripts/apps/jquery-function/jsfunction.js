// -------------------------------------------------------------------------//
// Open Modal Panel - Use in DataTable //
function openModalPanel(panelName) {
    //Open Modal Form/Panel
    jQuery.magnificPopup.open({
        removalDelay: 500, //delay removal by X to allow out-animation,
        items: { src: panelName },
        callbacks: {
            beforeOpen: function (e) {
                var Animation = "mfp-zoomIn";
                this.st.mainClass = Animation;
            },
            afterClose: function () {
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    })
}

function playnow() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', mp3notify);
    //audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.load();
    audioElement.play();
    //$.get();
}

function loadSummerNote() {
    // Init Summernote
    $('.summernote').summernote({
        height: 255, //set editable area's height
        focus: false, //set focus editable area after Initialize summernote
        oninit: function () { },
        onChange: function (contents, $editable) {
         //   console.log(contents);
            angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.onSaveMeetingNote(contents);
        },
        toolbar: [
   // [groupName, [list of button]]
   ['style', ['bold', 'italic', 'underline', 'clear']],
   ['fontsize', ['fontsize']],
   ['color', ['color']],
   ['para', ['ul', 'ol', 'paragraph']],
   ['height', ['height']]
        ]
    });
}

function loadSummerNoteReadOnly() {
    // Init Summernote
    $('.summernote').summernote({
        height: 255, //set editable area's height
        focus: false, //set focus editable area after Initialize summernote
        oninit: function () { },
        onChange: function (contents, $editable) {
           
        },
        toolbar: [
   // [groupName, [list of button]]
   //['style', ['bold', 'italic', 'underline', 'clear']],
   //['fontsize', ['fontsize']],
   //['color', ['color']],
   //['para', ['ul', 'ol', 'paragraph']],
   //['height', ['height']]
        ]
    });
}

// -------------------------------------------------------------------------//
// Usage for spin.js
var opts = {
    lines: 11, // The number of lines to draw
    length: 11, // The length of each line
    width: 4, // The line thickness
    radius: 11, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 46, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};
var spinnerTarget = document.getElementById('spinnerTarget');

// example email compose success notification

function loadPaloinIssueDate() {

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    //Initialize datetime picker
    $('#issue_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $('#target_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $('#start_date').datetimepicker({ format: 'MM/DD/YYYY' });


    $("#issue_date").on("dp.change", function (e) {
        $('#target_date').data("DateTimePicker").minDate(e.date);
        $('#start_date').data("DateTimePicker").minDate(e.date);

        angular.element(document.getElementById('ctrlPaloin')).scope().ctrl.issues.issuedate = $('#issue_date').data().date;


        var frequency = angular.element(document.getElementById('ctrlPaloin')).scope().ctrl.issues.followfrequency;
        $('#target_date').data("DateTimePicker").date(date.addDays(frequency * 2));
        $('#start_date').data("DateTimePicker").date(date.addDays(frequency));

        angular.element(document.getElementById('ctrlPaloin')).scope().$apply();

    });

    $("#target_date").on("dp.change", function (e) {

        $('#start_date').data("DateTimePicker").maxDate(e.date);
        angular.element(document.getElementById('ctrlPaloin')).scope().ctrl.issues.targetcompletiondate = $('#target_date').data().date;
        angular.element(document.getElementById('ctrlPaloin')).scope().$apply();
    });
    $("#start_date").on("dp.change", function (e) {
        angular.element(document.getElementById('ctrlPaloin')).scope().ctrl.issues.lastsenddate = $('#start_date').data().date;
        angular.element(document.getElementById('ctrlPaloin')).scope().$apply();
    });

}

function loadIssueDate() {

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    //Initialize datetime picker
    $('#issue_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $('#target_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $('#start_date').datetimepicker({ format: 'MM/DD/YYYY' });
  

    $("#issue_date").on("dp.change", function (e) {
        $('#target_date').data("DateTimePicker").minDate(e.date);
        $('#start_date').data("DateTimePicker").minDate(e.date);
   
        angular.element(document.getElementById('ctrlIssuesSetup')).scope().ctrl.issues.issuedate = $('#issue_date').data().date;
      

        var frequency = angular.element(document.getElementById('ctrlIssuesSetup')).scope().ctrl.issues.followfrequency;
        $('#target_date').data("DateTimePicker").date(date.addDays(frequency * 2));
        $('#start_date').data("DateTimePicker").date(date.addDays(frequency));

        angular.element(document.getElementById('ctrlIssuesSetup')).scope().$apply();

    });

    $("#target_date").on("dp.change", function (e) {
     
        $('#start_date').data("DateTimePicker").maxDate(e.date);
        angular.element(document.getElementById('ctrlIssuesSetup')).scope().ctrl.issues.targetcompletiondate = $('#target_date').data().date;
        angular.element(document.getElementById('ctrlIssuesSetup')).scope().$apply();
    });
    $("#start_date").on("dp.change", function (e) {
        angular.element(document.getElementById('ctrlIssuesSetup')).scope().ctrl.issues.lastsenddate = $('#start_date').data().date;
        angular.element(document.getElementById('ctrlIssuesSetup')).scope().$apply();
    });
      
}

function loadMeetingSetup() {

    var date = new Date();
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    //Initialize datetime picker
    $('#target_date').datetimepicker({ format: 'MM/DD/YYYY', minDate: moment() });
    $('#start_date').datetimepicker({ format: 'MM/DD/YYYY', minDate: moment() });



    var frequency = angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.issues.followfrequency;
    $('#target_date').data("DateTimePicker").date(date.addDays(frequency * 2));
    $('#start_date').data("DateTimePicker").date(date.addDays(frequency));

    angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.issues.targetcompletiondate = $('#target_date').data().date;
    angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.issues.lastsenddate = $('#start_date').data().date;
    angular.element(document.getElementById('ctrlMinutesSetup')).scope().$apply();

    $("#target_date").on("dp.change", function (e) {

        $('#start_date').data("DateTimePicker").maxDate(e.date);
        angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.issues.targetcompletiondate = $('#target_date').data().date;
        angular.element(document.getElementById('ctrlMinutesSetup')).scope().$apply();
    });
    $("#start_date").on("dp.change", function (e) {
        angular.element(document.getElementById('ctrlMinutesSetup')).scope().ctrl.issues.lastsenddate = $('#start_date').data().date;
        angular.element(document.getElementById('ctrlMinutesSetup')).scope().$apply();
    });

}


function ParkResumeDate() {
    $('#resume_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $("#resume_date").on("dp.change", function (e) {
        angular.element(document.getElementById('ctrlResponse')).scope().ctrl.resume_date = $('#resume_date').data().date;
        angular.element(document.getElementById('ctrlResponse')).scope().$apply();
    });
}

function ParkResumeDateResonse() {
    $('#resume_date').datetimepicker({ format: 'MM/DD/YYYY' });
    $("#resume_date").on("dp.change", function (e) {
        angular.element(document.getElementById('ctrlResponseResponse')).scope().ctrl.resume_date = $('#resume_date').data().date;
        angular.element(document.getElementById('ctrlResponseResponse')).scope().$apply();
    });
}

function initReponse() {
    // Init custom navigation animation
    setTimeout(function () {
        $('.custom-nav-animation li').each(function (i, e) {
            var This = $(this);
            var timer = setTimeout(function () {
                This.addClass('animated animated-short zoomIn');
            }, 50 * i);
        });
    }, 500);

    // Init Demo smoothscroll
    $('.tray-nav a').smoothScroll({
        offset: -145
    });

   
    
}

function runAdminPannel() {
    // Init Admin Panels on widgets inside the ".admin-panels" container
    $('.admin-panels').adminpanel({
        grid: '.admin-grid',
        draggable: true,
        preserveGrid: true,
        mobile: false,
        callback: function () {
            bootbox.confirm('<h3>A Custom Callback!</h3>', function () { });
        },
        onFinish: function () {
            $('.admin-panels').addClass('animated fadeIn').removeClass('fade-onload');

            // Init the rest of the plugins now that the panels
            // have had a chance to be moved and organized.
            // It's less taxing to organize empty panels
           // demoHighCharts.init();
           // runVectorMaps();

            // We also refresh any "in-view" waypoints to ensure
            // the correct position is being calculated after the 
            // Admin Panels plugin moved everything
            Waypoint.refreshAll();

        },
        onSave: function () {
            $(window).trigger('resize');
        }
    });
}

function uploadFile(issueId) {
    $('input[type=text]').click(function () {
        $('input[type=file]').trigger('click');
    });

    $('input[type=file]').change(function () {
        var vals = $(this).val(),
            val = vals.length ? vals.split('\\').pop() : '';

        $('input[type=text]').val(val);
    });
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}


function findModalActive(modalid) {
    var activeModal = $('#' + modalid);
    return activeModal;
};

function OpenCustomModal(modalId) {
    $.magnificPopup.open({

        removalDelay: 500, //delay removal by X to allow out-animation,
        items: {
            src: findModalActive(modalId)
        },
        // overflowY: 'hidden', // 
        callbacks: {
            beforeOpen: function (e) {
                var Animation = 'mfp-zoomIn';
                this.st.mainClass = Animation;
            }
        },
        midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
    });
}

function CloseCustomModal(modalId) {
    $.magnificPopup.close({
        items: {
            src: findModalActive(modalId)
        }
    });
}







