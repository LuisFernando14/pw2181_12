var $ = require('jquery');
$(document).ready(function () {
        //JSON = JavaScript Object Notation
        $('#usuid').focus();

        function validaUsuario () {
                //http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario=920&clave=12345678
                var urlApi = 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?';
                var usuario = $('#usuid').val();
                var pass = $('#pass').val();
                urlApi = urlApi+'usuario='+usuario+'&clave='+pass;
                console.log(urlApi);
                var respuesta = false;
                $.ajax({
                        url: urlApi,
                        dataType: 'json',
                        success: function(data) {
                                console.log(data.respuesta);
                                respuesta = data.respuesta;
                        }
                });
                if(!respuesta) {
                        
                }
        }

        $('#entrar').on('click', function () {
                validaUsuario();
        });
});
