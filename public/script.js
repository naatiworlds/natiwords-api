document.getElementById('project-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;

    const project = {
        name,
        description,
        url
    };

    try {
        const response = await fetch('https://natiwords-api.vercel.app/routes/proyectos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tu_token_jwt}` // Asegúrate de reemplazar esto con tu token JWT
            },
            body: JSON.stringify(project)
        });

        if (response.ok) {
            document.getElementById('message').innerText = 'Proyecto añadido con éxito';
            document.getElementById('project-form').reset();
        } else {
            document.getElementById('message').innerText = 'Error al añadir proyecto';
        }
    } catch (error) {
        document.getElementById('message').innerText = 'Error de red';
    }
});
