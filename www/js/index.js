document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova está inicializado
}

(function($){
    $(function(){
        var options = { "swipeable": true };
        var el = document.getElementsByClassName('tabs');
        var instance = M.Tabs.init(el, options);
    }); // end of document ready
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sidenav
    var sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    // Inicializar tabs
    var tabsElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabsElems);

    // Funcionalidad del botón para buscar personajes de Star Wars
    $('#search-character').click(function() {
        var characterName = $('#character-name').val().trim().toLowerCase(); // Asegurarse de que el input esté limpio
        if (characterName) {
            // Hacer la llamada AJAX a la API de SWAPI
            $.ajax({
                url: 'https://swapi.dev/api/people/?search=' + characterName,
                method: 'GET',
                success: function(data) {
                    if (data.results && data.results.length > 0) {
                        // Limpiar el contenido anterior en #character-result
                        $('#character-result').html('');

                        // Mostrar información básica del personaje
                        var character = data.results[0];
                        var html = '<h5>' + character.name + '</h5>';
                        html += '<p><strong>Altura:</strong> ' + character.height + ' cm</p>';
                        html += '<p><strong>Peso:</strong> ' + character.mass + ' kg</p>';
                        html += '<p><strong>Género:</strong> ' + character.gender + '</p>';
                        html += '<p><strong>Año de nacimiento:</strong> ' + character.birth_year + '</p>';

                        // Insertar en el contenedor
                        $('#character-result').html(html);

                        // Actualizar la lista de personajes en la Collection List
                        var characterListHtml = '';
                        characterListHtml += '<a href="#!" class="collection-item">' + character.name + '</a>';
                        $('#character-list').html(characterListHtml);
                    } else {
                        $('#character-result').html('<p>Personaje no encontrado. Intenta con otro nombre.</p>');
                        $('#character-list').html('<a href="#!" class="collection-item">Personajes</a>');
                    }
                },
                error: function(xhr, status, error) {
                    $('#character-result').html('<p>Error al buscar el personaje. Intenta de nuevo.</p>');
                    console.log('Error:', xhr.responseText);  // Mostrar detalles del error en la consola
                    $('#character-list').html('<a href="#!" class="collection-item">Personajes</a>');
                }
            });
        } else {
            $('#character-result').html('<p>Por favor, introduce un nombre de personaje.</p>');
        }
    });
    
    document.getElementById('go-to-test-2').addEventListener('click', function() {
        var elem = document.querySelector('#tabs-swipe-demo'); // Seleccionar el contenedor de tabs
        var instance = M.Tabs.getInstance(elem); // Obtener la instancia de Materialize Tabs
        instance.select('test-swipe-2'); // Seleccionar la pestaña Test 2
    });
    
    // Lógica para la cámara en Test 3
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const takePhotoButton = document.getElementById('take-photo');

    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(err) {
            console.log('Error al acceder a la cámara: ' + err);
        });

    // Tomar la foto cuando se hace clic en el botón
    takePhotoButton.addEventListener('click', function() {
        // Dibujar el video en el canvas (tamaño ajustado)
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Mostrar la imagen tomada al lado del video
        const image = document.getElementById('photo');
        image.src = canvas.toDataURL('image/png');  // Convertir el canvas a imagen
        image.style.display = 'block';  // Mostrar la imagen
    });
});
