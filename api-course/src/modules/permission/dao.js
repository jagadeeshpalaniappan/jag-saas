const { Permission } = require("./model");
const MONGO_DUPLICATE_KEY = 11000;

/**
 * Get permission list.
 * List the permissions in descending order of 'createdAt' timestamp.
 * @property {number} obj.skip - Number of permissions to be skipped.
 * @property {number} obj.limit - Limit number of permissions to be returned.
 * @returns {Course[]}
 */
async function getAll({
  limit,
  skip,
  accessCode,
  isActive = true,
  userIds = [],
  userGroupIds = [],
}) {
  const userIdQueries = userIds.map((userId) => ({
    entityType: "USER",
    entityId: userId,
  }));
  const userGroupIdQueries = userGroupIds.map((userGroupId) => ({
    entityType: "USER_GROUP",
    entityId: userGroupId,
  }));
  // const $or = [{ _id: objId }, { name: param }, { nickname: param }],
  const $or = [...userIdQueries, ...userGroupIdQueries];
  const $and = [{ isActive }];
  return Permission.find({ $or, $and })
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
}

/**
 * Create new permission
 * @property {string} obj.title - The permission of title.
 * @property {string} obj.description - The description of permission.
 * @property {string} obj.published - The published of permission.
 * @returns {Course}
 */
async function createOne(obj) {
  const permission = new Permission(obj);
  const savedCourse = await permission.save();
  return savedCourse;
}

async function create(permissions) {
  try {
    // POPULATE:
    const permissionDocs = permissions.map(
      (permission) => new Permission(permission)
    );
    // TX:
    const data = await Permission.create(permissionDocs);
    return data;
  } catch (error) {
    //duplicate key
    if (error && error.code === MONGO_DUPLICATE_KEY) {
      throw new Error(`[${obj.permissionId}] Permission Already exists! `);
    }
    throw error;
  }
}

module.exports = { getAll, create };
