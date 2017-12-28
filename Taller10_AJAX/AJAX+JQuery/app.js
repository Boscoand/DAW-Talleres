// $ Selector individual
// Load, evento de carga

$(window).load(function() {
    $('#requerimiento').click(function() {


        $.ajax({
            url: 'datos.txt',
            error: function() {
                alert('¡Ocurrió un error!');
            },
            dataType: 'text',
            success: function(data) {
                alert(data);
            },
            type: 'GET'
        });

        
    })
});
