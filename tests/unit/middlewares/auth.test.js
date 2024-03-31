const config = require("config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  config.get("db.database"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    dialect: config.get("db.dialect"),
    pool: {
      max: config.get("db.pool.max"),
      min: config.get("db.pool.min"),
      acquire: config.get("db.pool.acquire"),
      idle: config.get("db.pool.idle"),
    },
  }
);
global.sequelize = sequelize;
const { authService } = require("../../../features/auth/index");
const auth = require("../../../middlewares/auth");

describe("auth middleware", () => {
  it("should set req.user if the token is valid", () => {
    const payload = {
      id: 1,
      name: "ahmed",
      email: "ahmed@gmail.com",
    };
    const accessToken = authService.generateAccessToken(payload);

    const req = {
      header: jest.fn().mockReturnValue(accessToken),
    };

    const res = {};

    const next = jest.fn();

    auth(req, res, next);
    expect(req.user).toMatchObject(payload);
  });
});
