# TalentoTech - AdoptAR
## Introducción
Aplicación de frontend para el curso de Talento Tech Año 2025 curso 014 Turno Noche.<br/>
La aplicación es una SPA (Single Page Aplicación) relacionado con la adopción de mascotas (Principalmente Perros y Gatos).
<br/>

## Contenido

AdoptAr consiste de un index.html y posee tres secciones principales:</br>
-**Inicio**: Consiste de un carrousel/slider con 4 images cuyo primer slider contiene un botón que al apretarlo scrollea a la sección de adopción.
La idea de este slider es mostrar imagenes acerca de la adopción de mascotas. 
<br/>
-**Adoptar**: Posee tres burbujas principales con tres mascotas para adoptar. La idea es que cada burbuja abra el formulario de adopcion si es que se presiona el botón
 **Conócelo**. Además cuenta con un botón que redirige a una nueva pagina con un listado de todas las mascotas que para adoptar<br/> 
-**Tienda**: Lista de productos disponibles en nuestra tienda. Consiste de tres secciones:
 - **Barra de búsqueda y filtrado**: En la barra de busqueda se puede ingresar nombre o descripcion del producto. Adicionalmente permite ordenar por nombre y precio de forma ascendente/descendente.
 - **Lista de productos**: Lista de productos disponible en nuestra tienda. Cada tarjeta muestra: nombre, descripcion, valoracion, cantidad de reviews y stock.
 - **Carrito**: Carrito persistente al refrescar la pagina. Permite modificar cantidades de los productos en el carrito como tambien eliminarlos de el.

-**Contacto**: Tiene dos elementos: Un formulario de contacto y un mapa con la ubicacion del refugio principal.<br/>

-**Pagina de adopción** (se abre desde el boton: *conocelos a todos*): Muestra todos las mascotas disponible en nuestros refugios. Al momento de apretar en conocelo (ya sea desde la pantalla principal o de esta) se despliega un modal con la informacion y en donde se puede ver a la mascota
## Pasos a seguir:
 - Agregar integracion de carrito con backend para poder realizar la compra.
