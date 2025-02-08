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
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(6);
const auth_module_1 = __webpack_require__(7);
const blog_module_1 = __webpack_require__(22);
const blog_model_1 = __webpack_require__(13);
const user_model_1 = __webpack_require__(11);
const app_controller_1 = __webpack_require__(30);
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
        controllers: [app_controller_1.AppController],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(8);
const sequelize_1 = __webpack_require__(6);
const auth_controller_1 = __webpack_require__(9);
const auth_service_1 = __webpack_require__(10);
const user_model_1 = __webpack_require__(11);
const jwt_strategy_1 = __webpack_require__(18);
const jwt_auth_guard_1 = __webpack_require__(21);
const core_1 = __webpack_require__(2);
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
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(10);
const create_user_dto_1 = __webpack_require__(16);
const public_decorator_1 = __webpack_require__(17);
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
    signUp(createUserDto) {
        return this.authService.signUp(createUserDto);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('signin'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in to the application' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'johndoe' },
                password: { type: 'string', example: 'password123' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User successfully signed in',
        schema: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        role: { type: 'string' }
                    }
                },
                token: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
tslib_1.__decorate([
    (0, common_1.Post)('signup'),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User successfully created',
        schema: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        role: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    }
                },
                token: { type: 'string' }
            }
        }
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Username already exists' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(8);
const sequelize_1 = __webpack_require__(6);
const user_model_1 = __webpack_require__(11);
const bcrypt = tslib_1.__importStar(__webpack_require__(15));
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
    async signUp(createUserDto) {
        try {
            // Check if user exists
            const existingUser = await this.userModel.findOne({
                where: { username: createUserDto.username },
            });
            if (existingUser) {
                throw new common_1.ConflictException('Username already exists');
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            // Create new user
            const user = await this.userModel.create({
                username: createUserDto.username,
                password: hashedPassword,
                role: 'user',
            });
            // Generate JWT token
            const token = this.jwtService.sign({
                sub: user.id,
                username: user.username,
                role: user.role,
            });
            // Get user data without password
            const userData = user.toJSON();
            delete userData.password;
            return {
                user: userData,
                token,
            };
        }
        catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new common_1.ConflictException('Username already exists');
            }
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(12);
const blog_model_1 = __webpack_require__(13);
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
/* 12 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Blog = void 0;
const tslib_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(11);
const class_validator_1 = __webpack_require__(14);
let Blog = class Blog extends sequelize_typescript_1.Model {
};
exports.Blog = Blog;
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "title", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT('medium'),
        allowNull: false,
    }),
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
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "thumbnail", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT('tiny'),
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "description", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], Blog.prototype, "slug", void 0);
exports.Blog = Blog = tslib_1.__decorate([
    sequelize_typescript_1.Table
], Blog);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(3);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username for the account',
        example: 'johndoe',
        minLength: 3,
        maxLength: 20
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_-]*$/, {
        message: 'Username can only contain letters, numbers, underscores and hyphens'
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password for the account',
        example: 'StrongP@ssw0rd',
        minLength: 6,
        maxLength: 50
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(1);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__(5);
const passport_jwt_1 = __webpack_require__(19);
const passport_1 = __webpack_require__(20);
const common_1 = __webpack_require__(1);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Make sure this matches your JWT secret
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
/* 19 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(20);
const core_1 = __webpack_require__(2);
const public_decorator_1 = __webpack_require__(17);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogModule = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(6);
const blog_controller_1 = __webpack_require__(23);
const blog_service_1 = __webpack_require__(24);
const blog_model_1 = __webpack_require__(13);
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
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(3);
const jwt_auth_guard_1 = __webpack_require__(21);
const blog_service_1 = __webpack_require__(24);
const search_blog_dto_1 = __webpack_require__(26);
const create_blog_dto_1 = __webpack_require__(28);
const update_blog_dto_1 = __webpack_require__(29);
const public_decorator_1 = __webpack_require__(17);
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
    findOneById(id) {
        return this.blogService.findOne(id);
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
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new blog post',
        description: 'Creates a new blog post with the provided title, content, and tags',
    }),
    (0, swagger_1.ApiBody)({ type: create_blog_dto_1.CreateBlogDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Blog post created successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 1 },
                        title: { type: 'string', example: 'My First Blog Post' },
                        content: { type: 'string', example: 'This is the content...' },
                        tag: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['technology', 'programming'],
                        },
                        authorId: { type: 'number', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                message: { type: 'string', example: 'Blog created successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_blog_dto_1.CreateBlogDto !== "undefined" && create_blog_dto_1.CreateBlogDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "create", null);
tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all blog posts',
        description: "Retrieves all blog posts with their authors' information",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all blog posts',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            title: { type: 'string', example: 'My Blog Post' },
                            content: { type: 'string', example: 'Content...' },
                            tag: {
                                type: 'array',
                                items: { type: 'string' },
                                example: ['technology', 'programming'],
                            },
                            authorId: { type: 'number', example: 1 },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                            author: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number', example: 1 },
                                    username: { type: 'string', example: 'johndoe' },
                                },
                            },
                        },
                    },
                },
                message: { type: 'string', example: 'Blogs fetched successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search blog posts',
        description: 'Search blog posts by keyword in title and tags with pagination',
    }),
    (0, swagger_1.ApiBody)({ type: search_blog_dto_1.SearchBlogDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns matching blog posts with pagination info',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 1 },
                            title: { type: 'string', example: 'My Blog Post' },
                            content: { type: 'string', example: 'Content...' },
                            tag: {
                                type: 'array',
                                items: { type: 'string' },
                                example: ['technology', 'programming'],
                            },
                            authorId: { type: 'number', example: 1 },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                        },
                    },
                },
                total: { type: 'number', example: 10 },
                offset: { type: 'number', example: 0 },
                limit: { type: 'number', example: 10 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof search_blog_dto_1.SearchBlogDto !== "undefined" && search_blog_dto_1.SearchBlogDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "search", null);
tslib_1.__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a blog post by ID',
        description: 'Retrieves a specific blog post by its ID with author information',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog post ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the blog post',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 1 },
                        title: { type: 'string', example: 'My Blog Post' },
                        content: { type: 'string', example: 'Content...' },
                        tag: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['technology', 'programming'],
                        },
                        authorId: { type: 'number', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                        author: {
                            type: 'object',
                            properties: {
                                id: { type: 'number', example: 1 },
                                username: { type: 'string', example: 'johndoe' },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Blog post not found',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Blog with ID 1 not found' },
                error: { type: 'string', example: 'Not Found' },
                statusCode: { type: 'number', example: 404 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "findOneById", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a blog post',
        description: 'Updates an existing blog post with the provided data',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog post ID', example: 1 }),
    (0, swagger_1.ApiBody)({ type: update_blog_dto_1.UpdateBlogDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog post updated successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number', example: 1 },
                        title: { type: 'string', example: 'Updated Blog Post' },
                        content: { type: 'string', example: 'Updated content...' },
                        tag: {
                            type: 'array',
                            items: { type: 'string' },
                            example: ['technology', 'programming'],
                        },
                        authorId: { type: 'number', example: 1 },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                message: { type: 'string', example: 'Blog updated successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Blog post not found',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Blog with ID 1 not found' },
                error: { type: 'string', example: 'Not Found' },
                statusCode: { type: 'number', example: 404 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof update_blog_dto_1.UpdateBlogDto !== "undefined" && update_blog_dto_1.UpdateBlogDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a blog post',
        description: 'Deletes a blog post by its ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Blog post ID', example: 1 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Blog post deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Blog deleted successfully' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Blog post not found',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Blog with ID 1 not found' },
                error: { type: 'string', example: 'Not Found' },
                statusCode: { type: 'number', example: 404 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], BlogController.prototype, "remove", null);
exports.BlogController = BlogController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('blogs'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('blogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof blog_service_1.BlogService !== "undefined" && blog_service_1.BlogService) === "function" ? _a : Object])
], BlogController);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlogService = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(6);
const blog_model_1 = __webpack_require__(13);
const user_model_1 = __webpack_require__(11);
const sequelize_2 = __webpack_require__(25);
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async create(createBlogDto) {
        const content = JSON.stringify(createBlogDto.content);
        return this.blogModel
            .create({
            ...createBlogDto,
            content,
        })
            .then((blog) => {
            return {
                data: blog.toJSON()?.id,
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
        const trimmedKeyword = keyword.trim();
        const blogs = await this.blogModel.findAndCountAll({
            where: {
                [sequelize_2.Op.or]: [
                    {
                        title: {
                            [sequelize_2.Op.iLike]: `%${trimmedKeyword}%`,
                        },
                    },
                    {
                        tag: {
                            [sequelize_2.Op.overlap]: [trimmedKeyword],
                        },
                    },
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
    async findOne(slug) {
        const isNumber = !isNaN(+slug);
        const blog = await this.blogModel.findOne({
            where: isNumber ? { id: +slug } : { slug },
            include: [
                {
                    model: user_model_1.User,
                    attributes: ['id', 'username'],
                },
            ],
        });
        if (!blog) {
            throw new common_1.NotFoundException(`Blog with slug ${slug} not found`);
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
/* 25 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SearchBlogDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(3);
const class_transformer_1 = __webpack_require__(27);
class SearchBlogDto {
}
exports.SearchBlogDto = SearchBlogDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search keyword for blog title or tags',
        example: 'technology',
        required: true,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    tslib_1.__metadata("design:type", String)
], SearchBlogDto.prototype, "keyword", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items to skip',
        example: 0,
        default: 0,
        minimum: 0,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], SearchBlogDto.prototype, "offset", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of items to return',
        example: 10,
        default: 10,
        minimum: 1,
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], SearchBlogDto.prototype, "limit", void 0);


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateBlogDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(3);
class CreateBlogDto {
}
exports.CreateBlogDto = CreateBlogDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the blog post',
        example: 'My First Blog Post',
        minLength: 3,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    tslib_1.__metadata("design:type", String)
], CreateBlogDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The content of the blog post',
        example: 'This is the content of my blog post...',
        minLength: 10,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], CreateBlogDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags for the blog post',
        example: ['technology', 'programming'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateBlogDto.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Thumbnail of the blog post',
        example: 'https://example.com/thumbnail.jpg',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBlogDto.prototype, "thumbnail", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Description of the blog post',
        example: 'This is the description of my blog post...',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBlogDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Slug of the blog post',
        example: 'my-first-blog-post',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateBlogDto.prototype, "slug", void 0);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBlogDto = void 0;
const tslib_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(14);
const swagger_1 = __webpack_require__(3);
class UpdateBlogDto {
}
exports.UpdateBlogDto = UpdateBlogDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The title of the blog post',
        example: 'Updated Blog Post Title',
        required: false,
        minLength: 3,
        maxLength: 100
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    tslib_1.__metadata("design:type", String)
], UpdateBlogDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The content of the blog post',
        example: 'Updated content of my blog post...',
        required: false,
        minLength: 10
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    tslib_1.__metadata("design:type", String)
], UpdateBlogDto.prototype, "content", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tags for the blog post',
        example: ['technology', 'programming'],
        required: false,
        type: [String]
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], UpdateBlogDto.prototype, "tag", void 0);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(5);
const common_1 = __webpack_require__(1);
let AppController = class AppController {
    getHello() {
        return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Phú Trần's API</title>
          <link rel="icon" type="image/x-icon" href="logotmp.ico" />
          <style>
              :root {
                  --primary-color: #2c3e50;
                  --secondary-color: #34495e;
                  --accent-color: #3498db;
                  --background-color: #f5f5f5;
                  --card-background: #ffffff;
                  --text-color: #2c3e50;
                  --signature-color: #7f8c8d;
              }

              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }

              body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  background-color: var(--background-color);
                  color: var(--text-color);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 20px;
              }

              .container {
                  background-color: var(--card-background);
                  padding: 2.5rem;
                  border-radius: 15px;
                  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                  max-width: 800px;
                  width: 100%;
                  animation: fadeIn 0.6s ease-out;
                  transition: transform 0.3s ease;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }

              .container:hover {
                  transform: translateY(-5px);
              }

              h1 {
                  color: var(--primary-color);
                  text-align: center;
                  margin-bottom: 1.5rem;
                  font-size: 2.5rem;
                  font-weight: 700;
                  position: relative;
                  padding-bottom: 1rem;
              }

              h1::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  transform: translateX(-50%);
                  width: 60px;
                  height: 4px;
                  background-color: var(--accent-color);
                  border-radius: 2px;
              }

              p {
                  color: var(--secondary-color);
                  text-align: center;
                  font-size: 1.25rem;
                  margin: 1rem 0;
                  line-height: 1.8;
              }

              .signature {
                  font-style: italic;
                  color: var(--signature-color);
                  text-align: right;
                  margin: 1.5rem 0;
                  font-size: 1.1rem;
                  align-self: flex-end;
              }

              .logo-image {
                  width: 400px;
                  height: auto;
                  border-radius: 10px;
                  margin-top: 20px;
                  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                  transition: transform 0.3s ease;
              }

              .logo-image:hover {
                  transform: scale(1.02);
              }

              @keyframes fadeIn {
                  from {
                      opacity: 0;
                      transform: translateY(20px);
                  }
                  to {
                      opacity: 1;
                      transform: translateY(0);
                  }
              }

              @media (max-width: 768px) {
                  .container {
                      padding: 1.5rem;
                      margin: 1rem;
                  }

                  h1 {
                      font-size: 2rem;
                  }

                  p {
                      font-size: 1.1rem;
                  }

                  .logo-image {
                      width: 100%;
                      max-width: 300px;
                  }
              }

              @media (max-width: 480px) {
                  h1 {
                      font-size: 1.75rem;
                  }

                  p {
                      font-size: 1rem;
                  }

                  .container {
                      padding: 1.25rem;
                  }

                  .logo-image {
                      max-width: 250px;
                  }
              }

              @media (prefers-color-scheme: dark) {
                  :root {
                      --primary-color: #ecf0f1;
                      --secondary-color: #bdc3c7;
                      --background-color: #2c3e50;
                      --card-background: #34495e;
                      --text-color: #ecf0f1;
                      --signature-color: #95a5a6;
                  }

                  .container {
                      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                  }

                  .logo-image {
                      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>Welcome to Phú Trần's API</h1>
              <p>Hello guys, Welcome to my API!</p>
              <p class="signature">Let's make our life better than yesterday - Phú Trần (Michael Tran)</p>
              <img 
                  class="logo-image"
                  priority="high" 
                  src="https://phutran.info.vn/assets/logotmp.jpg" 
                  alt="Phú Trần Logo"
              />
          </div>
      </body>
      </html>
    `;
    }
};
exports.AppController = AppController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'text/html'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)()
], AppController);


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
const swagger_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const common_2 = __webpack_require__(1);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = '';
    app.setGlobalPrefix(globalPrefix);
    // Enable CORS
    app.enableCors({
        origin: [
            'https://phutran.info.vn',
            'https://www.phutran.info.vn',
            'https://api.phutran.info.vn',
            'http://localhost:4200',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    // Add this line to enable validation
    app.useGlobalPipes(new common_2.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    // Swagger configuration
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Phú Trần API')
        .setDescription("The API documentation for Phú Trần's services")
        .setVersion('1.0')
        .addTag('auth', 'Authentication endpoints')
        .addTag('blogs', 'Blog management endpoints')
        .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
    }, 'access-token' // This name should match the @ApiBearerAuth() decorator in your controllers
    )
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'Phú Trần API Documentation',
        customfavIcon: 'https://phutran.info.vn/assets/logotmp.png',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'none',
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
        },
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map