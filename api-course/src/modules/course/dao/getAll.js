const { Course } = require("../model/Course");
const { macthResourcePermissions } = require("./permissions");

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
  name,
  activeOnly,
  permissionId,
  courseGroupIds,
  userGroupIds,
  userId,
}) {
  // QUERY:
  const query = {};
  if (name) query.name = { $regex: `.*${name}.*`, $options: "i" };
  // query.isActive = activeOnly;
  query.resourcePermissions = macthResourcePermissions({
    permissionId,
    userId,
    userGroupIds,
    courseGroupIds,
  });

  console.log(JSON.stringify(query));
  return Course.find(query)
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
}

module.exports = { getAll };
