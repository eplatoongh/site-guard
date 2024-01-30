import {
  calculateTotalHours,
  calculateTotalHoursAsync,
  dotAnimation,
  getCurrentDayHighlighted,
} from "./functions.js";
import { HTML, addC, on, onN, qs, qsa, removeC } from "./selectors.js";

const cpySiteAddress = "https://guard-track-site-guard.netlify.app";

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
  const btn = `px-2 py-1 border`;
  const doDom = new Promise((resolve, reject) => {
    data.forEach((obj, i) => {
      dom.innerHTML += `
        <div 
          data-schedule-id="${obj._id}" 
          class="shadow-sm px-4 py-2 border flex justify-between"
        >
          <div>
            <p class="text-md text-[var(--black)] flex gap-2 items-center">
              ${obj.guardName} | 

              <span class="p-2 border flex gap-2 text-xs">
                <input 
                  type="time"
                  value="${obj.startTime}" 
                  data-time-input 
                  data-time-start
                /> 
                - 
                <input 
                  type="time" 
                  value="${obj.endTime}" 
                  data-time-input
                  data-time-end
                />
              </span> | 

              <span data-show-hr>${obj.totalHour}hr</span> | 

              <span 
                  class="flex items-center gap-1"
              >
                Track link: ${cpySiteAddress}?id=${obj._id} 
                <button 
                  data-cpy="${cpySiteAddress}?id=${obj._id}"
                  class="p-1 text-xs border bg-[var(--secondary)] text-[var(--white)]"
                >
                  copy
                </button>
              </span>
            </p>
  
            <div class="text-sm text-[var(--light-black)] grid gap-2">
              <div class="flex gap-2">
                <p>${obj.clientName},</p>
                <p>${obj.postSite}</p>
              </div>
  
              <p>${getCurrentDayHighlighted(obj.repeatShift)}</p>
            </div>
          </div>
          
          <div class="text-sm text-[var(--light-black)] grid gap-2">
            <p>
              <span>${obj.contact}</span> | <span>${obj.address}</span>
            </p>
  
            <div class="flex gap-2 items-center" data-work-btn-container>
              <button
              data-work-done 
                class="${btn} ${obj.workDone ? `active` : ``}"
              >
                Done
              </button>
              
              <button
              data-work-not-done 
              class="${btn} ${obj.workDone ? `` : `active`}"
              >
                Not Done
              </button>
            </div>
          </div>
        </div>
      `;

      if (i + 1 == data.length) {
        resolve(true);
      }
    });
  });

  const doneFetch = async (data, sl, tx) => {
    dotAnimation.start(sl, 150);

    await fetch(`/admin/worker/schedule/work/done`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    dotAnimation.stop();
    sl.textContent = tx;
    sl.classList.add("active");
  };

  (async () => {
    let res = await doDom;
    if (res) {
      Array.from(qs("[data-work-btn-container]").children).forEach((btn) => {
        onN(btn, "click", async (e) => {
          Array.from(qs("[data-work-btn-container]").children).forEach((btn) =>
            btn.classList.remove("active")
          );

          const id = btn.closest("[data-schedule-id]").dataset.scheduleId;

          if (Object.keys(e.target.dataset).includes("workDone")) {
            doneFetch({ id, done: true }, btn, "Done");
          } else {
            doneFetch({ id, done: false }, btn, "Not Done");
          }
        });
      });

      qsa("[data-time-input]").forEach((timeInput) => {
        onN(timeInput, "change", async (e) => {
          const scheduleBox = e.target.closest("[data-schedule-id]");
          let scheduleId = scheduleBox.dataset.scheduleId;
          const inside = (sl) => scheduleBox.querySelector(sl);
          let timeStartVal = inside("[data-time-start]").value;
          let timeEndVal = inside("[data-time-end]").value;
          let guardTotalHr = calculateTotalHours(timeStartVal, timeEndVal);

          dotAnimation.start(qs("[data-show-hr]"), 150);
          await fetch(`/admin/guard/time/report/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: scheduleId,
              startTime: timeStartVal,
              endTime: timeEndVal,
              totalHour: guardTotalHr,
            }),
          });
          dotAnimation.stop();
          qs("[data-show-hr]").textContent = `${guardTotalHr}hr`;
        });
      });

      function copyDataAttributes() {
        const copyBtn = qs("[data-cpy]");

        // Get the value from the data attribute
        const valueToCopy = copyBtn.dataset.cpy;

        navigator.clipboard
          .writeText(valueToCopy)
          .then(() => {
            // Inform the user that the value has been copied
            alert("Copied: " + valueToCopy);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      }

      // Add click event listener to the button
      on("[data-cpy]", "click", copyDataAttributes);
    }
  })();
};
export const schedulePanelTemp = (dom) => {
  dom.innerHTML = `
  <div>
    <div class="flex justify-end">
      <input type="date" class="schedule-date-input border p-2 text-sm" />
    </div>

    <div data-schedule-list class="grid gap-4 py-4">
      ${selectDateTemp()}
    </div>
  </div>
  `;

  on(".schedule-date-input", "change", async (e) => {
    const listContainer = qs("[data-schedule-list]");
    listContainer.innerHTML = loaderTemp();
    //send the date to back-end and get the assined workers, of that date from the db

    let res = await fetch(`/admin/schedule/get/${e.target.value}/0/10`);
    let data = await res.json();
    console.log(data);

    listContainer.innerHTML = ``;
    scheduleCard(listContainer, data);
    data.length == 0 && (listContainer.innerHTML = noDataFoundTemp());
  });
};
export const trackGuardsPanelTemp = (dom) => {
  dom.innerHTML = `
  <div>
    <div class="flex justify-end">
      <input data-track-input type="text" class="border p-2 text-sm" placeholder="please enter a track link!" />
      <button data-track-btn class="px-4 py-2 border bg-[var(--secondary)] text-[var(--white)]">track</button>
    </div>

    <div data-schedule-list class="grid gap-4 py-4">
      <div data-temp-load></div>      
    </div>
  </div>
  `;

  let tracked = false;
  on("[data-track-btn]", "click", () => {
    let val = qs("[data-track-input]").value;

    if (val != "") {
      tracked = false;
      HTML("[data-schedule-list]", loaderTemp());

      let ioVal = val.split("?")[1].split("=")[1].trim();
      const socket = io();

      // Connect to the Socket.IO server

      socket.emit("btnClicked", { send: ioVal });

      // Handling received messages
      socket.on("chat message", (msg) => {
        let obj = JSON.parse(msg);
        console.log(obj);

        if (obj) {
          console.log(obj.from, ioVal);

          if (obj.from == ioVal) {
            tracked = true;
            locationMap(obj);
          }
          // Handle the received message (e.g., update UI)
        }
      });

      HTML(
        "[data-schedule-list]",
        `
        <p class="text-[var(--light-black)] font-medium">Can not locate!</p>
      `
      );
    }
  });

  //locationMap("mapIframe");
};
export const locationMap = ({ latitude, longitude }) => {
  const dom = qs("[data-schedule-list]");
  //dom.src = `https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=15&amp;output=embed`;
  //dom.src = `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3641.8344155337977!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDA2JzI2LjMiTiA5MMKwMjUnNDYuMyJF!5e0!3m2!1sen!2sbd!4v1703735012335!5m2!1sen!2sbd`;
  //<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3641.8344155337977!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDA2JzI2LjMiTiA5MMKwMjUnNDYuMyJF!5e0!3m2!1sen!2sbd!4v1703735012335!5m2!1sen!2sbd" width="800" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allow="geolocation"></iframe>
  dom.innerHTML = `      
      <div class="grid gap-2">
        <span>latitude: ${latitude}, longitude: ${longitude}</span>
        <a class="underline" target="_blank" href="https://www.google.com/maps/place/${latitude},${longitude}">See in google map</a>
      </div>
    `;
};

//pages/client
export const printReportCard = async ({ dom, data }) => {
  let totalHR = await calculateTotalHoursAsync(data);

  const doPromise = new Promise((resolve, reject) => {
    dom.innerHTML = `
      <div class="border px-4 py-2 border-[var(--secondary)]">
        <div class="flex justify-between">
          <div>
            <p>
              Selary: ${totalHR}hr x 
              $ <input 
                data-doller-input
                class="border p-2"
                type="number"
                min="0"
                value="10"
              />
              = 
              <span data-total-selary>$${totalHR * 10}</span> </p>
          </div>
        </div>
      </div>
    `;

    data.forEach((obj, i) => {
      const { guardName, contact, totalHour, workDone, workDate, address } =
        obj;

      dom.innerHTML += `
        <div class="border px-4 py-2 shadow-sm">
          <div class="flex justify-between">
            <div>
              <p class="text-[var(--light-black)] text-sm font-medium">${workDate}</p>
            </div>

            <div>             
              <p class="text-[var(--light-black)] text-sm font-medium">${totalHour}hr</p>
            </div>
          </div>
        </div>
      `;

      if (i + 1 == data.length) {
        resolve(true);
      }
    });
  });

  let res = await doPromise;

  if (res) {
    let changeFn = (e) => {
      let selary = e.target.value * totalHR;
      qs("[data-total-selary]").innerHTML = `$${selary}`;
    };

    on("[data-doller-input]", "change", changeFn);
    on("[data-doller-input]", "keyup", changeFn);
  }
};
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
export const clientSelectTemp = async ({
  postSiteSelectDom,
  guardsDom,
  clientProDom,
  contentDom,
  id,
  fetchClient,
}) => {
  let data = await fetchClient("get-a-client", id);
  console.log(data);

  clientProDom.innerHTML = `
    <div class="border border-[var(--secondary)] px-4 py-2 grid">
      <p class="text-[var(--black)] text-base font-semibold">${data.clientName}</p>
      <p class="text-[var(--light-black)] text-sm font-medium">${data.contact} | ${data.address}</p>
    </div>
  `;

  let postSiteMap = data.postSites.map((obj) => obj);
  postSiteMap.unshift({ _id: "none", name: "none" });

  let postSiteMapStr = postSiteMap.map((ps) => {
    return `
    <option value="${ps._id}">${ps.name}</option>
    `;
  });
  postSiteSelectDom.innerHTML = postSiteMapStr;

  onN(postSiteSelectDom, "change", (e) => {
    let val = e.target.value;
    if (val == "none") {
      qs(".guardMiniProfile").innerHTML = "";
      guardsDom.innerHTML = ``;
    } else {
      qs(".guardMiniProfile").innerHTML = "";

      let guardsMap = data.postSites
        .filter(({ _id }) => _id == val)[0]
        .guards.map((obj) => obj);
      guardsMap.unshift({ _id: "none", guardName: "none" });

      let guardsMapStr = guardsMap.map((grd) => {
        return `
    <option value="${grd._id}">${grd.guardName}</option>
    `;
      });
      guardsDom.innerHTML = guardsMapStr;
    }
  });

  onN(guardsDom, "change", (e) => {
    let val = e.target.value;

    if (val != "none") {
      const btn = `px-4 py-2 font-medium border`;

      let foundGuard = null;

      // Loop through postSites and guards to find the specific guard by ID
      data.postSites.forEach((postSite) => {
        const guard = postSite.guards.find((guard) => guard._id === val);
        if (guard) {
          foundGuard = guard;
          return; // Stop iteration once guard is found
        }
      });

      if (foundGuard) {
        let { guardName, address, contact } = foundGuard;

        qs(".guardMiniProfile").innerHTML = `
        <div class="p-2 border border-[var(--secondary)]">
          <div>
            <p class="text-[var(--black)] text-base font-semibold">${guardName}</p>
            <p class="text-[var(--light-black)] text-sm font-medium">${address} | ${contact}</p>
          </div>
        </div>
      `;
      }

      contentDom.innerHTML = `
        <div class="grid gap-2">
          <div class="flex justify-between items-center border-b pb-4">
            <div class="flex gap-2 text-[var(--light-black)]">
              <input type="date" class="border p-2 text-xs" data-date-start />
              -
              <input type="date" class="border p-2 text-xs" data-date-end />
            </div>

            <button data-report-filter-action-btn class="${btn} text-sm bg-[var(--secondary)] text-[var(--white)]">go</button>
          </div>

          <div data-report-content class="grid gap-4">
            <p class="text-[var(--light-black)] font-medium">
              Please select a date range first!
            </p>
          </div>
        </div>
      `;

      on("[data-report-filter-action-btn]", "click", async () => {
        let sendObj = {
          postSiteID: postSiteSelectDom.value,
          guardID: guardsDom.value,
          startDate: qs("[data-date-start]").value,
          endDate: qs("[data-date-end]").value,
        };

        let res = await fetch(`/admin/client/get/reports`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendObj),
        });

        let data = await res.json();

        data.length > 0 && (qs("[data-report-content]").innerHTML = ``);
        data.length > 0 &&
          printReportCard({ dom: qs("[data-report-content]"), data });
        data.length == 0 &&
          (qs("[data-report-content]").innerHTML = noDataFoundTemp());
      });
    } else {
      qs(".guardMiniProfile").innerHTML = "";
    }
  });
};
