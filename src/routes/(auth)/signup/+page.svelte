<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>User SignUp</h1>
{#if form?.required === true}
	<p>Dato de registro invalidos</p>
{/if}
{#if form?.exist === true}
	<p>El Correo está en uso.</p>
{/if}
{#if form?.server === true}
	<p>Hubo un error al procesar el registro.<br />Prueba más tarde.</p>
{/if}
<form method="POST">
	<div>
		<label for="firstName">Nombre:</label>
		<input type="text" name="firstName" id="firstName" required />
	</div>
	<div>
		<label for="lastName">Apellido:</label>
		<input type="text" name="lastName" id="lastName" required />
	</div>
	<div>
		<label for="email">Email:</label>
		<input type="email" name="email" id="email" required />
	</div>
	<div>
		<label for="password">Contraseña:</label>
		<input type="password" name="password" id="password" required />
	</div>
	<div>
		<label for="specialty">Specialidad:</label>
		<select name="specialty" id="specialty" required>
			<option value="DOCTOR">Doctor General</option>
			<option value="">Bioquimico</option>
			<option value="">Enfermero</option>
		</select>
	</div>
	<div>
		<label for="rpn">Rpn:</label>
		<input type="number" name="rpn" id="rpn" required />
	</div>
	<div>
		<label for="telephone">Telefono:</label>
		<input type="number" name="telephone" id="telephone" />
	</div>
	<button type="submit">Registrarse</button>
	<span>or</span>
	<a href="/login">Login</a>
</form>
