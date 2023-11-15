<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ user } = data);
</script>

<pre>
	{JSON.stringify(user, null, 2)}
</pre>
