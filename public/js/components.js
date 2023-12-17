import { on, qs } from "./selectors.js";

export const loaderTemp = (p4) =>
  `<p class="${
    p4 ? p4 : ""
  } text-[var(--light-black)] font-medium">loading..</p>`;
export const noDataFoundTemp = () =>
  `<p class="text-[var(--light-black)] font-medium">No data found!</p>`;
export const noPostSiteTemp = () =>
  `<p class="text-[var(--light-black)] font-medium text-sm">No post site found!</p>`;
export const noPostSiteGuardTemp = () =>
  `<p class="text-[var(--light-black)] font-medium text-sm">No guards found!</p>`;
export const selectPostSiteTemp = () =>
  `<p class="p-4 text-[var(--light-black)] font-medium text-sm">Select a post site first!</p>`;
export const selectDateTemp = () =>
  `<p class="p-4 text-[var(--light-black)] font-medium text-sm">Select a date first!</p>`;
export const deleteBoxTemp = (id, guardName) => `
    <div class="fixed top-0 left-0 w-full h-full bg-[var(--transparent-blur-bg)] backdrop-blur-sm del-confirm-box grid place-content-center">
      <div class="w-[400px] px-4 py-2 bg-[--white] shadow-md flex flex-col gap-4">
        <p class="font-medium text-lg">Are you sure?</p>

        <div class="flex gap-2 justify-end">
          <button class="px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] db-del-btn" data-del-id="${id}" data-del-g-name="${guardName}">Delete</button>
          <button class="px-3 py-1 text-sm font-medium text-[var(--light-black)] bg-[var(--extra-light-black)] del-cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  `;
//right side forms

export const guardsOptions = (arr) => {
  const newArr = arr.map((itm) => itm);
  newArr.unshift({ guardName: "none", contact: "none", address: "none" });

  return `
  ${newArr
    .map(
      (itm, i) =>
        `<option
            value="${i > 0 ? itm._id : `none`}"
            data-guard-name="${itm.guardName}"
            data-contact="${itm.contact}"
            data-address="${itm.address}"
          >
            ${itm.guardName}
         </option>`
    )
    .join(" ")}
  `;
};
export const postSiteOptions = (arr) => {
  const newArr = arr.map((itm) => itm);
  newArr.unshift({ name: "none" });

  return `
   ${newArr
     .map(
       (itm, i) =>
         `<option 
            value="${i > 0 ? itm._id : `none`}" 
            data-post-site="${itm.name}"
          >
            ${itm.name}
          </option>`
     )
     .join(" ")}
  `;
};
export const clientNameOptions = (arr) => {
  const newArr = arr.map((itm) => itm);
  newArr.unshift({ clientName: "none" });

  return `
   ${newArr
     .map(
       (itm, i) =>
         `<option 
            value="${i > 0 ? itm._id : `none`}" 
            data-client-name="${itm.clientName}"
          >
            ${itm.clientName}
          </option>`
     )
     .join(" ")}
  `;
};
export const siteFormTemp = () => `
<form class="grid gap-2 sites-add-form">
    <input
      type="text"
      placeholder="Site Name"
      name="siteName"
      class="px-4 py-2 border border-[var(--secondary)]"
    />

    <button
      type="submit"
      class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
    >
      Add
    </button>
</form>
`;
export const clientFormTemp = () => `
<form class="grid gap-2 client-add-form">
    <p class="border border-[var(--secondary)] text-[var(--secondary)] px-4 py-2 text-lg">Add client</p>

    <input
      type="text"
      placeholder="Client Name"
      name="clientName"
      class="px-4 py-2 border border-[var(--secondary)]"
    />
    <input
      type="text"
      placeholder="Address"
      name="address"
      class="px-4 py-2 border border-[var(--secondary)]"
    />
    <input
      type="text"
      placeholder="Contact"
      name="contact"
      class="px-4 py-2 border border-[var(--secondary)]"
    />

    <button
      type="submit"
      class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
    >
      Add
    </button>
</form>
`;
export const guardFormTemp = (data) => {
  return `
  <form class="grid gap-2 guard-add-form">
      <p class="border border-[var(--secondary)] text-[var(--secondary)] px-4 py-2 text-lg">Add guard</p>
  
      <input
        type="text"
        placeholder="Guard Name"
        name="guardName"
        class="px-4 py-2 border border-[var(--secondary)]"
      />
      <input
        type="text"
        placeholder="Address"
        name="address"
        class="px-4 py-2 border border-[var(--secondary)]"
      />
      <input
        type="text"
        placeholder="Contact"
        name="contact"
        class="px-4 py-2 border border-[var(--secondary)]"
      />
      <div>
        <p class="text-[var(--light-black)]">Client Name</p>
        <select data-select-client-name name="clientID" class="w-full px-4 py-2 border border-[var(--secondary)]" >
          ${clientNameOptions(data)}        
        </select>
      </div>
      
      <div>
        <p class="text-[var(--light-black)]">Post Site</p>
        <select data-select-post-site name="postSiteID" class="w-full px-4 py-2 border border-[var(--secondary)]">
          ${postSiteOptions([])}
        </select>
      </div>
  
      <button
        type="submit"
        class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
      >
        Add
      </button>
  </form>
  `;
};
export const assignWorkFormTemp = (data, todayDate) => {
  console.log(data);

  const weekNames = [
    { value: "monday", text: "Monday" },
    { value: "tuesday", text: "Tuesday" },
    { value: "wednesday", text: "Wednesday" },
    { value: "thursday", text: "Thursday" },
    { value: "friday", text: "Friday" },
    { value: "saturday", text: "Saturday" },
    { value: "sunday", text: "Sunday" },
  ];

  const repeatForOptions = [
    { value: "0w", text: "None" },
    { value: "1w", text: "1 weeks" },
    { value: "2w", text: "2 weeks" },
    { value: "3w", text: "3 weeks" },
    { value: "4w", text: "4 weeks" },
    { value: "5w", text: "5 weeks" },
    { value: "6w", text: "6 weeks" },
    { value: "2m", text: "2 months" },
    { value: "3m", text: "3 months" },
    { value: "4m", text: "4 months" },
    { value: "5m", text: "5 months" },
    { value: "6m", text: "6 months" },
  ];

  return `
    <form class="grid gap-2 assign-work-add-form">
        <p class="border border-[var(--secondary)] text-[var(--secondary)] px-4 py-2 text-lg text-center">Assigning work on ${todayDate}</p>

        <div>
          <p class="text-[var(--light-black)]">Client Name</p>
          <select 
            data-select-client-name 
            name="clientID" 
            class="w-full px-4 py-2 border border-[var(--secondary)]" 
          >
            ${clientNameOptions(data)}        
          </select>
        </div>

        <div class="grid gap-2 grid-cols-2">
          
    
          <div>
            <p class="text-[var(--light-black)]">Post Site</p>
            <select 
              data-select-post-site
              name="postSiteID" 
              class="w-full px-4 py-2 border border-[var(--secondary)]"
            >
              ${postSiteOptions([])}
            </select>
          </div>
    
          <div>
            <p class="text-[var(--light-black)]">Guard Name</p>
            <select 
              data-select-guard
              name="guardID"
              class="w-full px-4 py-2 border border-[var(--secondary)]"
            >
              ${guardsOptions([])}
            </select>
          </div>     
      
          <div>
            <p class="text-[var(--light-black)]">Starts</p>
            <input type="time" name="startTime" class="w-full px-4 py-2 border border-[var(--secondary)]">
          </div>
      
          <div>
            <p class="text-[var(--light-black)]">Ends</p>
            <input type="time" name="endTime" class="w-full px-4 py-2 border border-[var(--secondary)]">
          </div>

          <div>
            <p class="text-[var(--light-black)]">Repeat Shift</p>
            <select name="repeatShift" multiple class="p-1 border border-[var(--secondary)] w-full">
                  ${weekNames
                    .map(
                      (obj) =>
                        `<option value="${obj.value}" class="border px-2 py-1 my-1">${obj.text}</option>`
                    )
                    .join(" ")}
            </select>
          </div>

          <div>
            <p class="text-[var(--light-black)]">Repeat For</p>
            <select name="repeatFor" class="px-4 py-2 border border-[var(--secondary)] w-full">
                  ${repeatForOptions
                    .map(
                      (obj) =>
                        `<option value="${obj.value}">${obj.text}</option>`
                    )
                    .join(" ")}
            </select>
          </div>
        </div>
    
        <button
          type="submit"
          class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
        >
          Add
        </button>
    </form>
  `;
};
export const reportFormTemp = (obj) => {
  let hrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return `
<form class="grid gap-2 report-add-form">
    <div class="border border-[var(--secondary)] px-4 py-2">
      <p class="text-sm text-[var(--secondary)]">${obj.date} | ${
    obj.clientName
  }</p>
      <p class="text-xs text-[var(--secondary)]">
      ${obj.siteName} | ${obj.shift} | ${obj.startTime} - ${obj.endTime}
      </p>
    </div>

    <div>
      <input type="hidden" name="guardName" value="${obj.guardName}" />
      <input type="hidden" name="workId" value="${obj._id}" />
      <input type="hidden" name="date" value="${obj.date}" />
      <input type="hidden" name="shift" value="${obj.shift}" />
    </div>
    
    <div>
      <p class="text-[var(--light-black)]">Worked (in hours)</p>

      <select name="totalWorked" class="px-4 py-2 border border-[var(--secondary)] w-full">
        ${hrs.map((itm) => `<option value="${itm}">${itm}</option>`).join(" ")}
      </select>
    </div>

    <button
      type="submit"
      class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
    >
      Report
    </button>
</form>
`;
};
export const addPostSiteFormTemp = (id) => {
  return `
    <form class="grid gap-2" data-post-site-add-form="${id}">
      <div class="border border-[var(--secondary)] px-4 py-2">
        <p class="text-lg text-[var(--secondary)]">Add post site</p>
      </div>

      <input type="text" name="name" placeholder="Name" class="px-4 py-2 border border-[var(--secondary)]"/>
      <input type="text" name="address" placeholder="Address" class="px-4 py-2 border border-[var(--secondary)]"/>
      <input type="text" name="contact" placeholder="Contact" class="px-4 py-2 border border-[var(--secondary)]"/>
      

      <button
        type="submit"
        class="font-semibold text-[var(--white)] bg-[var(--secondary)] py-2"
      >
        Add
      </button>
    </form>
  `;
};
//cards
export const siteCardTemp = ({ siteName, _id }) => `
  <div class="border shadow-sm px-4 py-2 flex items-center justify-between">
      <p class="font-medium text-[var(--black)]">${siteName}</p>
      <button class="cursor-pointer px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}">Delete</button>
  </div>
`;
export const clientCardTemp = ({ clientName, _id }) => `
  <div class="cursor-pointer border shadow-sm px-4 py-2 flex items-center justify-between" data-client-card="${_id}">
      <p class="font-medium text-[var(--black)]">${clientName}</p>
      <button class="cursor-pointer px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}">Delete</button>
  </div>
`;
export const guardCardTemp = ({ guardName, _id, clientInfo }) => {
  return `
  <div class="border shadow-sm px-4 py-2 flex items-start justify-between" data-g-name="${guardName}" data-g-month="${`${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }`}">
      <p 
          class="font-medium text-[var(--black)]" 
          title="${clientInfo
            .map(
              (itm) =>
                `${itm.clientName} - ${itm.postSites
                  .map((ps) => ps.name)
                  .join(" , ")}`
            )
            .join(" | ")}"
      >
      
        <span class="text-[var(--secondary)]">${guardName}</span> <br>
        <span class="text-[var(--light-black)] text-sm">
          ${clientInfo
            .map(
              (itm) =>
                `<span class="text-[var(--black)]">${
                  itm.clientName
                }</span> - ${itm.postSites
                  .filter(
                    (ps) =>
                      ps.guards.filter((gd) => gd.guardName == guardName)
                        .length != 0
                  )
                  .map((ps) => ps.name)
                  .join(" , ")}`
            )
            .join(" <br> ")}
        </span>
      </p>

      <button class="px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}" data-del-g-name="${guardName}">Delete</button>
  </div>
`;
};
export const assignWorkCardTemp = ({ siteName, guardName, _id }) => `
  <div class="border shadow-sm px-4 py-2 cursor-pointer flex items-center justify-between">
      <div>
        <p class="font-medium text-[var(--black)]">${siteName}</p>
        <p class="font-medium text-sm text-[var(--light-black)]">${guardName}</p>
      </div>
      <button class="px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}">Delete</button>
  </div>
`;
export const reportCardTemp = ({ guardName, reportLeft, month }) => `
  <div class="border shadow-sm px-4 py-2 cursor-pointer report-card" data-g-name="${guardName}">
      <div class="pointer-events-none">
          <p class="font-medium text-[var(--black)]">${guardName} | ${month}</p>
          <p class="font-medium text-sm text-[var(--light-black)]">Report left: ${reportLeft}</p>
      </div>     
  </div>
`;

export const guardReportTemp = (obj, from) => {
  obj.data = obj.data.map((mpObj) => ({ guardName: obj.guardName, ...mpObj }));

  return `
  <div class="relative w-full h-px border flex flex-col gap-4 flex-auto overflow-x-hidden">
    <div class="px-5 py-2 sticky top-0 backdrop-blur-sm text-[var(--light-black)] border-b">
          <div class="flex justify-between">
            <div>
              <h2 class="text-[var(--black)]">${
                obj.guardName
              } | <span class="text-sm font-medium text-[var(--light-black)]">report left: 5/30</span></h2>       
              
              ${
                from
                  ? `
                <div>
                  <p>Total hour: <span class="total-hour-span">${obj.data.reduce(
                    (acc, dataObj) => {
                      if (!isNaN(dataObj.totalWorked)) {
                        acc += Number(dataObj.totalWorked);
                        return acc;
                      } else {
                        return acc;
                      }
                    },
                    0
                  )}</span></p>

                  <p>Per hour($): <input data-total-hour="${obj.data.reduce(
                    (acc, dataObj) => {
                      if (!isNaN(dataObj.totalWorked)) {
                        acc += Number(dataObj.totalWorked);
                        return acc;
                      } else {
                        return acc;
                      }
                    },
                    0
                  )}" type="number" value="10" class="border p-1 per-hour-input"/> </p>

                  <hr class="my-2"/>

                  <p>Salary: $<span class="salary-amount">${
                    obj.data.reduce((acc, dataObj) => {
                      if (!isNaN(dataObj.totalWorked)) {
                        acc += Number(dataObj.totalWorked);
                        return acc;
                      } else {
                        return acc;
                      }
                    }, 0) * 10
                  }</span> </p>
                </div>
              `
                  : ``
              }
            </div>

            <div>
              <input type="month" class="input-month border p-2" value="${`${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }`}"/>
            </div>
          </div>
    </div>

    <div class="p-4 grid gap-4 report-data">
      ${
        obj.data.length > 0
          ? eachGuardReportCardTemp(obj.data, from ? from : null)
          : noDataFoundTemp()
      }       
    </div>      
  </div>
`;
};
export const eachGuardReportCardTemp = (data, from) => `
  ${data
    .map(
      (dataObj) =>
        `
    <div class="border px-4 py-2 ${
      from ? "" : `cursor-pointer`
    } each-guard-report-card bg-[var(${
          dataObj.reportLeft ? `--reportNotDone` : `--reportDone`
        })]" data-each-guard-report-card='${JSON.stringify(dataObj)}'>
      <div class="pointer-events-none">
        <p class="text-[var(--light-black)] text-lg">
        ${dataObj.date} | ${dataObj.clientName} ${
          from ? `| ${dataObj.guardName}` : ""
        }
        </p>
        
        <div class="flex justify-between text-md">
          <p class="text-sm font-medium text-[var(--black)]">
          ${dataObj.siteName} | ${dataObj.shift} | 
          ${dataObj.startTime} - ${dataObj.endTime}
          </p>

          <p class="text-[var(--light-black)] text-sm font-medium">Total worked: 
            <span class="total-worked-span text-[var(--black)]">
              ${dataObj.totalWorked}
            </span> hr 
          </p>
        </div>
      </div>
    </div>
    `
    )
    .join(" ")}
`;

export const guardLiProfileTemp = (obj) => {
  let { guardName, address, contact } = obj;

  return `
    <div class="w-full flex flex-col flex-auto">
        <div data-post-site-profile class="w-full p-4 border-b">
          <div>
            <p>
              <span class="text-md font-medium text-[var(--black)]">${guardName}</span> | <span class="text-sm font-medium text-[var(--light-black)]">${address}</span>
            </p>
            
            <p> <span class="text-sm font-medium text-[var(--light-black)]">${contact}</span> </p>
          </div>
        </div>

        <div data-post-guard-info-li class="grid gap-2 p-2 overflow-x-hidden h-full">
         
        </div>
    </div>
  `;
};
export const postSiteGuardList = (arr) => {
  return `
  <div class="bg-[var(--primary)] w-[200px] h-full p-4 mx-4 flex flex-col gap-2">
    ${
      arr && arr.length > 0
        ? arr
            .map((obj) => {
              let { clientID, postSiteID, guardName, address, contact, _id } =
                obj;

              return `
                  <div 
                      class="cursor-pointer px-4 py-2 bg-[var(--white)] text-[var(--light-black)] hover:bg-[var(--secondary-hover)] hover:text-[var(--black)] transition-colors"
                      data-post-site-guard
                      data-post-site-i-d="${postSiteID}"
                      data-client-i-d="${clientID}"
                      data-guard-profile='${JSON.stringify({
                        _id,
                        guardName,
                        address,
                        contact,
                        clientID,
                        postSiteID,
                      })}'
                  >
                      ${guardName}
                  </div>
                `;
            })
            .join(" ")
        : noPostSiteGuardTemp()
    }           
  </div>
  `;
};
export const selectedPostSitePanel = (obj, guardData) => {
  let { name, address, contact, guards } = obj;

  return `
    <div class="w-full flex flex-col flex-auto">
      <div data-post-site-profile class="w-full p-4 border-b">
        <div>
          <p>
            <span class="text-md font-medium text-[var(--black)]">${name}</span> | <span class="text-sm font-medium text-[var(--light-black)]">${address}</span>
          </p>
          
          <p> <span class="text-sm font-medium text-[var(--light-black)]">${contact}</span> </p>
        </div>
      </div>

      <div class="flex flex-auto">
        <div class="h-full">
          ${postSiteGuardList(guards)}
        </div>

        <div data-guard-li-profile class="w-full"></div>
      </div>
    </div>
  `;
};
export const postSiteLists = (arr, clientID) => {
  return `
  <div class="bg-[var(--primary)] w-[200px] h-full p-4 flex flex-col gap-2">
    ${
      arr && arr.length > 0
        ? arr
            .map((obj) => {
              let { _id, name, address, contact, guards } = obj;

              return `
                <div 
                    class="cursor-pointer px-4 py-2 bg-[var(--white)] text-[var(--light-black)] hover:bg-[var(--secondary-hover)] hover:text-[var(--black)] transition-colors"
                    data-post-site
                    data-post-site-i-d="${_id}"
                    data-client-i-d="${clientID}"
                    data-post-site-profile='${JSON.stringify({
                      name,
                      address,
                      contact,
                      guards,
                    })}'>
                  ${name}
                </div>
              `;
            })
            .join(" ")
        : noPostSiteTemp()
    }           
  </div>
  `;
};
export const clientPanelTemp = (data) => {
  return `
  <div class="relative w-full h-px border flex flex-col flex-auto overflow-x-hidden">
        <div data-client-profile class="px-4 py-2 border-b flex justify-between">
          <div>
            <p>
              <span class="text-md font-medium text-[var(--black)]">${
                data.clientName
              }</span> | <span class="text-sm font-medium text-[var(--light-black)]">${
    data.address
  }</span>
            </p>
            
            <p> <span class="text-sm font-medium text-[var(--light-black)]">${
              data.contact
            }</span> </p>
          </div>

          <div>
            <button class="text-sm font-medium px-4 py-2 bg-[var(--secondary)] text-[var(--white)]" data-btn-id="${
              data._id
            }">Add Post Site</button>
          </div>
        </div>

        <div class="flex h-full">
          <div data-post-site-li-container>
            ${postSiteLists(data.postSites, data._id)}
          </div>

          <div data-selected-post-site-info class="w-full flex"></div>
        </div>
  </div>
`;
};

export const scheduleCard = (dom, data) => {
  data.forEach((obj) => {
    dom.innerHTML += `
      <div class="shadow-md px-4 py-2 border cursor-pointer flex justify-between">
        <div>
          <p class="text-md text-[var(--black)]">${obj.guardName}</p>
          <div class="text-sm text-[var(--light-black)] flex gap-2">
            <p>${obj.clientName},</p> 
            <p>${obj.postSite}</p>
          </div>
        </div>
        
        <di class="text-sm text-[var(--light-black)]">
          <p>${obj.contact}</p>
          <p>${obj.address}</p>
        </di>
      </div>
    `;
  });
};
export const schedulePanelTemp = (dom) => {
  dom.innerHTML = `
  <div>
    <div class="flex justify-end">
      <input type="date" class="schedule-date-input border p-2 text-sm" />
    </div>

    <div data-schedule-list class="grid gap-2">
      ${selectDateTemp()}
    </div>
  </div>
  `;

  on(".schedule-date-input", "change", async (e) => {
    //send the date to back-end and get the assined workers, of that date from the db

    let res = await fetch(`/admin/schedule/get/${e.target.value}/0/10`);
    let data = await res.json();
    console.log(data);

    scheduleCard(qs("[data-schedule-list]"), data);
  });
};

//pages/client
export const clientGuardSelectTemp = () => `
  <p class="text-[var(--light-black)] font-medium">
    Please select a guard first!
  </p>
`;
export const clientGuardCardTemp = (obj) => `
  <div
    data-guard-name="${obj.guardName}"
    data-g-month="${`${new Date().getFullYear()}-${new Date().getMonth() + 1}`}"
    class="client-gurad cursor-pointer font-medium text-[var(--light-black)] bg-[var(--white)] px-4 py-2 hover:bg-[var(--secondary-hover)] hover:text-[var(--extra-light-black)] transition-colors"
  >
    <div class="pointer-events-none">
      <p class="font-medium text-[var(--black)]">${obj.guardName}</p>
    </div>
  </div>
`;
export const clientLoginFormTemp = () => `
        <div class="client-login-form-container w-[100%] h-[100vh] bg-[var(--white)] grid place-content-center">
          <form class="client-login-form shadow-md px-4 py-2 grid gap-2">
            <div>
              <input type="text" name="clientName" class="p-2 border border-[var(--secondary)]" placeholder="Client name"/>
            </div>

            <button type="submit" class="py-2 bg-[var(--secondary)] text-[var(--white)] font-medium cursor-pointer">Login</button>
          </form>
        </div>
`;
