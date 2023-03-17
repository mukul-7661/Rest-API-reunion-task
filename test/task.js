const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();

chai.use(chaiHttp);

describe("Tasks api", () => {
  // user authentication with correct credentials

  describe("POST /api/authenticate", () => {
    it("Should login the user and return an access token", (done) => {
      const task = {
        email: "mukul@gmail.com",
        password: "123456",
      };
      chai
        .request(server)
        .post("/api/authenticate")
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property("access_token");
        });
      done();
    });
  });

  // user authentication with incorrect credentials

  describe("POST /api/authenticate", () => {
    it("Should return 400 status due to incorrect credentials", (done) => {
      const task = {
        email: "mukul@gmail.com",
        password: "12345678",
      };
      chai
        .request(server)
        .post("/api/authenticate")
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
        });
      done();
    });
  });

  // follow a user with given userID

  describe("POST /api/follow/:id", () => {
    it("Should follow a user with a given userID by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64131cad7b832f2de8558f4a";

      chai
        .request(server)
        .post("/api/follow/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  // follow a user with incorrect userID

  describe("POST /api/follow/:id", () => {
    it("Should return 500 status due to incorrect userID", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64131cad7b832f2de89798558f4a";

      chai
        .request(server)
        .post("/api/follow/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(500);
        });
      done();
    });
  });

  // follow a user with invalid jwt token

  describe("POST /api/follow/:id", () => {
    it("Should return 401 status due to incorrect jwt token", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQjkdnnkjaiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64131cad7b832f2de8558f4a";

      chai
        .request(server)
        .post("/api/follow/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(401);
        });
      done();
    });
  });

  // unfollow a user with given userId

  describe("POST /api/unfollow/:id", () => {
    it("Should unfollow a user with a given userID by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64131cad7b832f2de8558f4a";

      chai
        .request(server)
        .post("/api/unfollow/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  // unfollow a user with incorrect userID

  describe("POST /api/unfollow/:id", () => {
    it("Should return 500 status due to incorrect userID", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64131cad7b832f28449bde8558f4a";

      chai
        .request(server)
        .post("/api/unfollow/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(500);
        });
      done();
    });
  });

  // get the details of authenticated user

  describe("GET /api/user", () => {
    it("Return 200 as status code and username, followers and followings", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";

      chai
        .request(server)
        .get("/api/user")
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property("username");
          response.body.should.be.have.property("followers");
          response.body.should.be.have.property("followings");
        });
      done();
    });
  });

  // get the details of unauthenticated user

  describe("GET /api/user", () => {
    it("Should return 401 status due to incorrect jwt token", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6kjbbIkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";

      chai
        .request(server)
        .get("/api/user")
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(401);
        });
      done();
    });
  });

  // creating post with all required fields

  describe("POST /api/posts", () => {
    it("Should create a post by authenticated user and return Post ID, Title, Description, Created Time.", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";

      const task = {
        title: "Test title",
        desc: "Test desc",
      };
      chai
        .request(server)
        .post("/api/posts")
        .set({ Authorization: `Bearer ${token}` })
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.be.have.property("_id");
        });
      done();
    });
  });

  // creating post with title missing

  describe("POST /api/posts", () => {
    it("Should not create a post by authenticated user and return status 500.", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";

      const task = {
        desc: "Test desc",
      };
      chai
        .request(server)
        .post("/api/posts")
        .set({ Authorization: `Bearer ${token}` })
        .send(task)
        .end((err, response) => {
          response.should.have.status(500);
        });
      done();
    });
  });

  // Like a post

  describe("POST /api/like/:id", () => {
    it("Should like a post with a given PostId by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64132d3ef907d44a90b90ee9";

      chai
        .request(server)
        .post("/api/like/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  // Unlike a post

  describe("POST /api/unlike/:id", () => {
    it("Should unlike a post with a given PostId by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64132d3ef907d44a90b90ee9";

      chai
        .request(server)
        .post("/api/unlike/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  // comment on a post by the authenticated user

  describe("POST /api/comment/:id", () => {
    it("Should comment on a post with a given PostId by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64132d3ef907d44a90b90ee9";

      chai
        .request(server)
        .post("/api/comment/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  //   Get a post

  describe("GET /api/posts/:id", () => {
    it("Should get a post with a given PostId and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";
      const id = "64132d3ef907d44a90b90ee9";

      chai
        .request(server)
        .get("/api/posts/" + id)
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });

  //   Get all posts by the authenticated user

  describe("GET /api/all_posts", () => {
    it("Should get all post by authenticated user and return 200 as status code", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEzMWNhNjdiODMyZjJkZTg1NThmNDkiLCJpYXQiOjE2NzkwODI1OTEsImV4cCI6MTcxMDY0MDE5MX0.2xDBQdsTrhi-A29rznDDU441AhjL3AjWiWE9PRcY_wc";

      chai
        .request(server)
        .get("/api/all_posts")
        .set({ Authorization: `Bearer ${token}` })

        .end((err, response) => {
          response.should.have.status(200);
        });
      done();
    });
  });
});
