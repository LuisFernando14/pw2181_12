var $ = require('jquery');
$(document).ready(function () {
        //JSON = JavaScript Object Notation

        function nuevo () {
                $.ajax({
                        url: 'https://randomuser.me/api/',
                        dataType: 'json',
                        success: function(data) {
                                console.log(data);
                                $('#nombre').html(data.results[0].name.first+" "+data.results[0].name.last);
                                $('#foto').attr('src', data.results[0].picture.large);
                        }
                });
        }

        $('#btnNuevo').on('click', function () {
                nuevo();
        });
});
