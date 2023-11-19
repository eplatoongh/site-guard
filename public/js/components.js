export const loaderTemp = () =>
  `<p class="text-[var(--light-black)] font-medium">loading..</p>`;
export const noDataFoundTemp = () =>
  `<p class="text-[var(--light-black)] font-medium">No data found!</p>`;
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
export const guardFormTemp = () => `
<form class="grid gap-2 guard-add-form">
    <input
      type="text"
      placeholder="Guard Name"
      name="guardName"
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
    <input
      type="text"
      placeholder="Client Name"
      name="clientName"
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
export const assignWorkFormTemp = (data) => `
<form class="grid gap-2 assign-work-add-form">
    <div class="grid gap-2">
      <div>
        <input type="text" name="clientName" class="w-full px-4 py-2 border border-[var(--secondary)]" placeholder="Client name"/>
      </div>

      <div>
        <input type="text" name="siteName" class="w-full px-4 py-2 border border-[var(--secondary)]" placeholder="Site name"/>
      </div>

      <div>
        <input type="text" name="guardName" class="w-full px-4 py-2 border border-[var(--secondary)]" placeholder="Guard name"/>
      </div>      

      <div>
        <p class="text-[var(--light-black)]">Shift</p>
        <select name="shift" class="w-full px-4 py-2 border border-[var(--secondary)]">
          <option value="morning">Morning</option>
          <option value="night">Night</option>
        </select>
      </div>

      <div>
        <p class="text-[var(--light-black)]">Date</p>
        <input type="date" name="date" class="w-full px-4 py-2 border border-[var(--secondary)]">
      </div>
  
      <div>
        <p class="text-[var(--light-black)]">Starts</p>
        <input type="time" name="startTime" class="w-full px-4 py-2 border border-[var(--secondary)]">
      </div>
  
      <div>
        <p class="text-[var(--light-black)]">Ends</p>
        <input type="time" name="endTime" class="w-full px-4 py-2 border border-[var(--secondary)]">
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
export const reportFormTemp = (obj) => {
  console.log(obj);
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
//cards
export const siteCardTemp = ({ siteName, _id }) => `
  <div class="border shadow-sm px-4 py-2 flex items-center justify-between">
      <p class="font-medium text-[var(--black)]">${siteName}</p>
      <button class="cursor-pointer px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}">Delete</button>
  </div>
`;
export const guardCardTemp = ({ guardName, _id }) => `
  <div class="border shadow-sm px-4 py-2 cursor-pointer flex items-center justify-between report-card" data-g-name="${guardName}" data-g-month="${`${new Date().getFullYear()}-${
  new Date().getMonth() + 1
}`}">
      <p class="font-medium text-[var(--black)]">${guardName}</p>
      <button class="px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}" data-del-g-name="${guardName}">Delete</button>
  </div>
`;
export const clientCardTemp = ({ clientName, _id }) => `
  <div class="border shadow-sm px-4 py-2 flex items-center justify-between">
      <p class="font-medium text-[var(--black)]">${clientName}</p>
      <button class="cursor-pointer px-3 py-1 text-sm font-medium text-[var(--white)] bg-[var(--secondary)] del-btn" data-del-id="${_id}">Delete</button>
  </div>
`;
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
                  <p>Total hour: ${obj.data.reduce((acc, dataObj) => {
                    if (!isNaN(dataObj.totalWorked)) {
                      acc += Number(dataObj.totalWorked);
                      return acc;
                    } else {
                      return acc;
                    }
                  }, 0)}</p>

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
          ? eachGuardReportCardTemp(obj.data)
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
    } each-guard-report-card ${
          from
            ? ""
            : `bg-[var(${
                dataObj.reportLeft ? `--reportNotDone` : `--reportDone`
              })]`
        }" data-each-guard-report-card='${JSON.stringify(dataObj)}'>
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

//pages/client
export const clientGuardSelectTemp = () => `
  <p class="text-[var(--light-black)] font-medium">
    Please select a guard first!
  </p>
`;
export const clientGuardCardTemp = (obj) => `
  <div
    data-guard-name="${obj.guardName}"
    class="client-gurad cursor-pointer font-medium text-[var(--light-black)] bg-[var(--white)] px-4 py-2 hover:bg-[var(--secondary-hover)] hover:text-[var(--extra-light-black)] transition-colors"
  >
    <div class="pointer-events-none">
      <p class="font-medium text-[var(--black)]">${obj.guardName}</p>
      <p class="font-medium text-sm">${obj.month}</p>
    </div>
  </div>
`;
