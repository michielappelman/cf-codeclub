Running code here: https://week3.michiel.cloud/

We saw the immutability of inbound requests, the available properties of Request.cf, how to create new subrequests, how to create new responses, get and set headers.

Create a worker (or expand existing code) to handle automated traffic differently.
- Send human traffic to an origin
- Get additional ‘data’  from https://httpbin.org/get via a subrequest
- If the inbound request appears automated, always return JSON-formatted responses
- Use the inbound request data to filter bad bots
- For bad bots, return a JSON object indicating the request was blocked due to appearing to be non-human. Alternatively, return cats (http.cat/401)
- Set an Origin Resolve Override for your subrequest origin. What is the effect?

(Optional) If you need an API endpoint in your lab account:
- Create a CNAME DNS record to petstore3.swagger.io
- Set a Page Rule with Host Header Override = “petstore3.swagger.io”

