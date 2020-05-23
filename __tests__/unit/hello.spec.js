const { mockRequest, mockResponse, mockNext } = require("../utils/httpmocks");
const DefaultController =  require("../../src/app/controllers/default");
const defaultController = new DefaultController({});

describe("DefaultController", () => {
    describe("index", () => {
        let request,
            response,
            next;
        beforeEach(() => {
            request = mockRequest();
            response = mockResponse();
            next = mockNext();
        });

        it("Returns 200 HTTP response code with the right response message", async() => {
            await defaultController.index(request, response, next);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({message: "Hello from uplift bare skeleton backend"});
        });
    });
});