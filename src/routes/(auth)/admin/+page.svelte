<script lang="ts">
	import fullName from '$lib/utils/fullName';

	let dni: number;
	let patient: null | undefined | { dni: number; firstName: string; lastName: string };
	let searchPatientResults: 'found' | 'notFound' | 'idle' = 'idle';

	const handleSearch = async () => {
		const res = await fetch(`/api/patient/${dni}`);
		if (res.status === 404) {
			searchPatientResults = 'notFound';
			patient = null;
			return;
		}
		const patientRes = await res.json();
		patient = patientRes;
		searchPatientResults = 'found';
	};
</script>

<section>
	<form method="GET">
		<label for="dni">D.N.I</label>
		<input type="number" name="dni" id="dni" required bind:value={dni} />
		<button on:click={handleSearch}>Buscar Paciente</button>
	</form>
	{#if searchPatientResults === 'found' && patient}
		<div>
			<div>
				{fullName(patient)}
				{`D.N.I: ${patient.dni}`}
			</div>
		</div>
	{:else if searchPatientResults === 'notFound'}
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
				<label for="address">Direccion:</label>
				<input type="text" name="address" id="address" required />
			</div>
			<div>
				<label for="dni">DNI:</label>
				<input type="number" name="dni" id="dni" value={dni} required />
			</div>
			<div>
				<label for="telephone">Telefono:</label>
				<input type="number" name="telephone" id="telephone" />
			</div>
			<div>
				<label for="birthDate">Fecha de nacimiento:</label>
				<input type="date" name="birthDate" id="birthDate" />
			</div>
			<button type="submit">Crear</button>
			<button
				type="button"
				on:click={() => {
					searchPatientResults = 'idle';
				}}>No crear</button
			>
		</form>
	{/if}
</section>
