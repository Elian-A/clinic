<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ patient } = data);
</script>

<h1>Hello {patient.firstName + patient.lastName}</h1>
