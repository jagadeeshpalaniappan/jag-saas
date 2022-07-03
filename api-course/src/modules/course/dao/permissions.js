function macthResourcePermissions({
  permissionId,
  userId,
  userGroupIds,
  courseGroupIds,
}) {
  const $or = [];
  if (userId) {
    $or.push({
      accessorType: "USER",
      accessorId: userId,
      permissions: { $elemMatch: { permissionId } },
    });
  }

  if (userGroupIds) {
    // if user's any of the userGroup have access (consider user have access to the resource)
    const userGroupIdQueries = userGroupIds.map((userGroupId) => ({
      accessorType: "USER_GROUP",
      accessorId: userGroupId,
      permissions: { $elemMatch: { permissionId } },
    }));
    $or.push(...userGroupIdQueries);
  }

  if (courseGroupIds) {
    // if user's any of the courseGroup have access (consider user have access to the resource)
    const courseGroupIdQueries = courseGroupIds.map((courseGroupId) => ({
      accessorType: "COURSE_GROUP",
      accessorId: courseGroupId,
    }));
    $or.push(...courseGroupIdQueries);
  }

  return { $elemMatch: { $or } };
}

module.exports = { macthResourcePermissions };
