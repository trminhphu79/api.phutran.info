/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(5);
const auth_module_1 = __webpack_require__(6);
const blog_module_1 = __webpack_require__(17);
const blog_model_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(10);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                autoLoadModels: true,
                synchronize: true,
                models: [user_model_1.User, blog_model_1.Blog],
            }),
            auth_module_1.AuthModule,
            blog_module_1.BlogModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(5);
const auth_controller_1 = __webpack_require__(8);
const auth_service_1 = __webpack_require__(9);
const user_model_1 = __webpack_require__(10);
const jwt_strategy_1 = __webpack_require__(14);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([user_model_1.User]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET, // In production, use environment variable
                signOptions: { expiresIn: '1h' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(9);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto) {
        const result = await this.authService.signIn(signInDto.username, signInDto.password);
        if (!result) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return result;
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('signin'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(5);
const user_model_1 = __webpack_require__(10);
const bcrypt = tslib_1.__importStar(__webpack_require__(13));
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signIn(username, password) {
        const user = await this.userModel.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username: user.username, sub: user.id };
            return {
                accessToken: this.jwtService.sign(payload),
                message: 'Sign in successfully',
            };
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(11);
const blog_model_1 = __webpack_require__(12);
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasMany)(() => blog_model_1.Blog),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "blogs", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = tslib_1.__decorate([
    sequelize_typescript_1.Table
], User);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Blog = void 0;
const tslib_1 = __webpack_require__(4);
const sequelize_typescript_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(10);
let Blog = class Blog extends sequelize_typescript_1.Model {
};
exports.Blog = Blog;
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "title", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "content", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
    }),
    tslib_1.__metadata("design:type", Array)
], Blog.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Blog.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Blog.prototype, "author", void 0);
exports.Blog = Blog = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Blog);


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(4);
const passport_jwt_1 = __webpack_require__(15);
const passport_1 = __webpack_require__(16);
const common_1 = __webpack_require__(1);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Use same secret as in AuthModule
        });
    }
    async validate(payload) {
        return { userId: payload.sub, username: payload.username };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], JwtStrategy);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(5);
const blog_controller_1 = __webpack_require__(18);
const blog_service_1 = __webpack_require__(20);
const blog_model_1 = __webpack_require__(12);
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([blog_model_1.Blog])],
        controllers: [blog_controller_1.BlogController],
        providers: [blog_service_1.BlogService],
    })
], BlogModule);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const jwt_auth_guard_1 = __webpack_require__(19);
const blog_service_1 = __webpack_require__(20);
const search_blog_dto_1 = __webpack_require__(22);
const create_blog_dto_1 = __webpack_require__(23);
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    create(createBlogDto) {
        return this.blogService.create(createBlogDto);
    }
    findAll() {
        return this.blogService.findAll();
    }
    search(searchDto) {
        return this.blogService.search(searchDto);
    }
    findOne(id) {
        return this.blogService.findOne(+id);
    }
    update(id, updateBlogDto) {
        return this.blogService.update(+id, updateBlogDto);
    }
    remove(id) {
        return this.blogService.remove(+id);
    }
};
exports.BlogController = BlogController;
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_blog_dto_1.CreateBlogDto !== "undefined" && create_blog_dto_1.CreateBlogDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Post)('search'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof search_blog_dto_1.SearchBlogDto !== "undefined" && search_blog_dto_1.SearchBlogDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "search", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
exports.BlogController = BlogController = tslib_1.__decorate([
    (0, common_1.Controller)('blogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof blog_service_1.BlogService !== "undefined" && blog_service_1.BlogService) === "function" ? _a : Object])
], BlogController);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(16);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogService = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(5);
const blog_model_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(10);
const sequelize_2 = __webpack_require__(21);
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async create(createBlogDto) {
        return this.blogModel
            .create({
            ...createBlogDto,
        })
            .then((blog) => {
            return {
                data: blog,
                message: 'Blog created successfully',
            };
        });
    }
    async findAll() {
        return this.blogModel
            .findAll({
            include: [
                {
                    model: user_model_1.User,
                    attributes: ['id', 'username'], // Only return safe user fields
                },
            ],
        })
            .then((blogs) => {
            return {
                data: blogs,
                message: 'Blogs fetched successfully',
            };
        });
    }
    async search(searchDto) {
        const { keyword, offset, limit } = searchDto;
        const blogs = await this.blogModel.findAndCountAll({
            where: {
                [sequelize_2.Op.or]: [
                    { title: { [sequelize_2.Op.like]: `%${keyword}%` } },
                    { tag: { [sequelize_2.Op.like]: `%${keyword}%` } },
                ],
            },
            offset,
            limit,
        });
        return {
            data: blogs.rows,
            total: blogs.count,
            offset,
            limit,
        };
    }
    async findOne(id) {
        const blog = await this.blogModel.findOne({
            where: { id },
            include: [
                {
                    model: user_model_1.User,
                    attributes: ['id', 'username'],
                },
            ],
        });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        return {
            data: blog,
        };
    }
    async update(id, updateBlogDto) {
        const blog = await this.blogModel.findByPk(id);
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        await blog.update(updateBlogDto);
        return {
            data: blog,
            message: 'Blog updated successfully',
        };
    }
    async remove(id) {
        const blog = await this.blogModel.findByPk(id);
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with ID ${id} not found`);
        }
        await blog.destroy();
        return { message: 'Blog deleted successfully' };
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(blog_model_1.Blog)),
    tslib_1.__metadata("design:paramtypes", [Object])
], BlogService);


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchBlogDto = void 0;
class SearchBlogDto {
}
exports.SearchBlogDto = SearchBlogDto;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBlogDto = void 0;
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = '';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map