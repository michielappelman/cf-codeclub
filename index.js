export default {
	fetch(request, env) {
    console.log(request);
    console.log(env);
		return new Response('Hello worker!', {
			headers: {
				'content-type': 'text/plain',
			},
		});
	},
};
