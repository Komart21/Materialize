document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sidenav
    var sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    // Inicializar tabs
    var tabsElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabsElems);

    // Funcionalidad del botón para buscar Pokémon
    $('#search-pokemon').click(function() {
        var pokemonName = $('#pokemon-name').val().toLowerCase(); // Obtener valor del input
        if (pokemonName) {
            console.log('Buscando el Pokémon:', pokemonName);
            // Hacer la llamada AJAX a la API de Pokémon
            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/' + pokemonName,
                method: 'GET',
                success: function(data) {
                    console.log('Respuesta exitosa de la API:', data);
                    // Limpiar el contenido anterior en #pokemon-result
                    $('#pokemon-result').html('');

                    // Mostrar información básica del Pokémon
                    var html = '<h5>' + data.name.toUpperCase() + '</h5>';
                    html += '<img src="' + data.sprites.front_default + '" alt="' + data.name + '">';
                    html += '<p><strong>Altura:</strong> ' + data.height / 10 + ' m</p>';
                    html += '<p><strong>Peso:</strong> ' + data.weight / 10 + ' kg</p>';
                    html += '<p><strong>Tipos:</strong> ' + data.types.map(type => type.type.name).join(', ') + '</p>';

                    // Insertar en el contenedor
                    $('#pokemon-result').html(html);

                    // Actualizar la lista de Pokémons en la Collection List
                    var pokemonListHtml = '';
                    pokemonListHtml += '<a href="#!" class="collection-item">' + data.name + '</a>';
                    $('#pokemon-list').html(pokemonListHtml);
                },
                error: function(xhr, status, error) {
                    console.error('Error en la solicitud AJAX:', error);
                    $('#pokemon-result').html('<p>Pokémon no encontrado. Intenta con otro nombre o número.</p>');
                    $('#pokemon-list').html('<a href="#!" class="collection-item">Pokemons</a>');
                }
            });
        } else {
            $('#pokemon-result').html('<p>Por favor, introduce un nombre o número de Pokémon.</p>');
        }
    });
});
