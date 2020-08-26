//search
 const getSearchedResults = e => {
   e.preventDefault();

   if (!searchValue || searchValue.length === 0 || searchValue.length === 1) {
     return;
   }

   setReset(true);

   const regex = RegExp(searchValue, "gi");
   const highlighted = <span className="yellow"> {searchValue} </span>;

   let res = [];

   const results = history.filter(elem => {
     if (elem.name) {
       let name = elem.name;
       if (name.split(" ").includes(searchValue)) {
         elem.name = <span className="yellow"> {elem.name} </span>;
         res.push(elem);
       }
     }

     if (elem.date_local) {
       const date = elem.date_local;

       console.log("elem.date_local", elem.date_local);
       console.log("elem.date_local.split(-)", elem.date_local.split("-"));
       console.log(typeof elem.date_local.split("-"));

       if (date.split("-").includes(searchValue)) {
         res.push(elem);
       }
     }

     if (elem.details) {
       const details = elem.details;
       console.log("elem.details", elem.details);
       // if (details.split(" ").includes(searchValue)) {
       //   //elem.details = details.replace(regex, highlighted)
       //   elem.details = <span className="yellow"> {elem.details} </span>;
       //   res.push(elem);
       // }
     }
   });

   //highlight search term

   console.log("res", res);
   setData(res);

   // let str = res.join();
   // console.log(str);
   // str = str.replace(regex, highlighted);
   // console.log(str);
   // res = res.join("").replace(regex, highlighted);
   // console.log(res.split());
   //
   // setData(res.split());
 };
