export const getData = async (type, additionalData, month) => {
  let promise = new Promise(async (resolve, reject) => {
    let array = [];

    if (type == ".site-li") {
      let res = await fetch(`/admin/site/get/0/10`);
      array = await res.json();
    }

    if (type == ".guard-li") {
      let res = await fetch(`/admin/guard/get/0/10`);
      array = await res.json();
    }

    if (type == ".client-li") {
      let res = await fetch(`/admin/client/get/0/10`);
      array = await res.json();
    }

    if (type == ".assign-work-li") {
      let res = await fetch(`/admin/work/get/0/10`);
      array = await res.json();
    }

    if (type == "each-guard") {
      let res = await fetch(
        `/admin/name/guard/get/${additionalData.trim().toLowerCase()}/${month}`
      );

      let { works } = await res.json();

      array = {
        guardName: additionalData ? additionalData : "--",
        data: works.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return -1;
          } else {
            return 1;
          }
        }),
      };
    }

    resolve(array);
  });

  let res = await promise;
  return res;
};
