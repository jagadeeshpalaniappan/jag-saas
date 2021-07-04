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
  resourceType,
  resourceId,
  userId,
  userGroupIds = [],
  isActive = true,
}) {
  // AND:
  const $and = [];
  if (accessCode) $and.push({ access: { $elemMatch: { accessCode } } });
  if (resourceType) $and.push({ resourceType });
  if (resourceId) $and.push({ resourceId });

  // OR:
  const $or = [];
  if (userId) $or.push({ accessorType: "USER", accessorId: userId });
  if (userGroupIds) {
    // if user's any of the userGroup have access (consider user have access to the resource)
    const userGroupIdQueries = userGroupIds.map((userGroupId) => ({
      accessorType: "USER_GROUP",
      accessorId: userGroupId,
    }));
    $or.push(...userGroupIdQueries);
  }

  // QUERY:
  const query = {};
  if ($and && $and.length > 0) query.$and = $and;
  if ($or && $or.length > 0) query.$or = $or;

  // const query = { access: { $elemMatch: { accessCode } } };
  console.log(JSON.stringify(query));
  return Permission.find(query)
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
    const data = await Permission.insertMany(permissions);
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
