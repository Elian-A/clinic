<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h1>root</h1>
<p>Hi ....!</p>

<pre>
	{JSON.stringify(data, null, 2)}
</pre>
<form method="POST" action="/logout">
	<button>Salir</button>
</form>
