<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<h1>Iniciar Session</h1>
{#if form?.required === true}
	<p>Dato de registro invalidos</p>
{/if}
{#if form?.invalid === true}
	<p>Credenciales invalidas.</p>
{/if}

<form method="POST">
	<div>
		<label for="email">Email: </label>
		<input type="email" name="email" id="email" required />
	</div>

	<div>
		<label for="password">Contraseña:</label>
		<input type="password" name="password" id="password" required />
	</div>
	<button>Iniciar Session</button>
	<span>or</span>
	<a href="/signup">Sign up</a>
</form>
