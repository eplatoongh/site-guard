export const getData = async (type, additionalData, month, clientName) => {
  let promise = new Promise(async (resolve, reject) => {
    let array = [];

    if (type == ".site-li") {
      let res = await fetch(`/admin/site/get/0/10`);
      array = await res.json();
    }

    if (type == ".guard-li") {
      // let res = await fetch(`/admin/guard/get/0/10`);
      // array = await res.json();
      array = [];
    }

    if (type == ".client-li") {
      let res = await fetch(`/admin/client/get/0/10`);
      array = await res.json();
    }

    if (type == ".assign-work-li") {
      array = [];
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

    if (type == "client-guards") {
      let res = await fetch(`/admin/client/guards/${clientName}/0/10`);
      array = await res.json();
    }

    if (type == "client-each-guard") {
      let res = await fetch(
        `/admin/client/each/guard/get/${additionalData
          .trim()
          .toLowerCase()}/${month}/${clientName}`
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

    if (type == "get-a-client") {
      let res = await fetch(`/admin/get/a/client/${additionalData}`);
      array = await res.json();
    }

    if (type == "load-clients-with-their-post-sites") {
      let res = await fetch(`/admin/get/clients/with/post/site`);
      array = await res.json();
    }

    if (type == "get-guards-from-post-site") {
      let res = await fetch(
        `/admin/get/guards/from/post/site/${additionalData.clientID}/${additionalData.postSiteID}`
      );
      array = await res.json();
    }

    resolve(array);
  });

  let res = await promise;
  return res;
};
