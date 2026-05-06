const nama = document.getElementById("nama")
const umur = document.getElementById("umur")
const jabatan = document.getElementById("jabatan")
const ol = document.getElementById("ol")
const form = document.getElementById("form")
const btn_input = document.getElementById("btn_input")


// function tombol sumit
form.addEventListener(("submit"), (event) => {
    event.preventDefault()

    let data = []
    localStorage.setItem("list data", JSON.stringify(data))

    const nama_value = nama.value
    const umur_value = umur.value
    const jabatan_value = jabatan.value


    let check = true

    if (nama_value == "") {
      
        nama.style.border = "1px solid red"
       
        check = false
    } else {
        nama.style.border = "1px solid blue"
    }

    if (umur_value == "") {
        alert("tolong masukan data dengan benar")
      
        umur.style.border = "1px solid red"
      
        check = false
    } else {
        umur.style.border = "1px solid blue"
    }
   

    if (jabatan_value == "") {
        alert("tolong masukan data")
       
        jabatan.style.border = "1px solid red"
       
        check = false
    } else {
        jabatan.style.border = "1px solid blue"
      
      
    }

    if (check == true) {
           data = [
            {
                nama: nama_value,
                umur: umur_value,
                jabatan: jabatan_value,

            }
        ]
        localStorage.setItem("list data", JSON.stringify(data))

     

        form.reset()
        tampilan_list()
    }

    localStorage.setItem("list data", JSON.stringify(data))
})

function get_data_storge() {
    const get_data = localStorage.getItem("list data")
    let list_data = JSON.parse(get_data)

    console.log(list_data, "hai")
    return list_data
}

function tampilan_list() {
    const list = get_data_storge()

    list.forEach(i => {
     table_data_karyawan.innerHTML+=`<tr><td>${i.nama}</td></tr> 
<tr><td>${i.umur}</td></tr>
<tr><td>${i.jabatan}</td></tr>`
    })
}


// input jadwal

const input_jadwal = document.getElementById("input_jadwal")
const prioritas = document.getElementsByClassName("prioritas")
const submit = document.getElementById("btn_submit")
const jadwal = document.getElementById("table_jadwal")
const tr_jadwal = document.getElementById("tr_jadwal")
const simpan = document.getElementById("btn_simpan")

let data_jadwal = JSON.parse(localStorage.getItem("jadwal")) || []
let data_jadwal_done = JSON.parse(localStorage.getItem("jadwa; done")) || []

console.log(tr_jadwal)

submit.addEventListener(("click"), () => {
    console.log("hallo")

    let value_jadwal = input_jadwal.value
    let waktu = new Date().toLocaleTimeString()
    let value_prioritas = document.querySelectorAll(".prioritas")

    let loop_prioritas = []

    value_prioritas.forEach((item) => {
        if (item.checked) {
            loop_prioritas.push(item.value)
        }

        console.log(loop_prioritas, "hoo")
    })

    if (value_jadwal == "" || loop_prioritas.length == 0) {
        alert("tolong semua data dari input dan juga prioritas di isi dengan benar")
        return
    }

    if (loop_prioritas.length > 1) {
        alert("prioritas hanya boleh satu")
        return
    }

    jadwal.innerHTML += `<tr class="baris_jadwal"><td>${value_jadwal}</td>
    <td>${loop_prioritas}</td>
    <td>${waktu}</td>
    <td><button class="btn_hapus">hapus</button></td></tr>`

    const btn_hapus = document.querySelectorAll(".btn_hapus")

    btn_hapus.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove()
        })
    })


    data_jadwal.push({
        jadwal: value_jadwal,
        prioritas: loop_prioritas,
        waktu: waktu,
    })

    return data_jadwal
})

let table_simpan = document.getElementById("table_simpan")
let table_done = document.getElementById("table_done")


// input jadwal done
function simpan_jadwal() {
    let ar_jadwal = []

    localStorage.setItem("jadwal", JSON.stringify(data_jadwal))

    Object.values(data_jadwal).forEach((i) => {
        ar_jadwal.push(i)

        table_simpan.innerHTML += `<tr class="baris_jadwal"><td>${i.jadwal}</td>
    <td>${i.prioritas}</td>
    <td>${i.waktu}</td>
    <td> <input type="checkbox" name="" id="" value="done" class="check_done"</td>
    </tr>`

        let check_done = document.querySelectorAll(".check_done")

        check_done.forEach((item) => {
            item.addEventListener(("click"), () => {
                let baris = item.closest("tr")
                let td = baris.querySelectorAll("td")

                let data_click = {
                    jadwal: td[0].innerText,
                    prioritas: td[1].innerText,
                    waktu: td[2].innerText,
                }

                let idBaris = `${data_click.jadwal}-${data_click.prioritas}-${data_click.waktu}`

                console.log(item)

                if (item.checked) {
                    baris.classList.add("done")
                    console.log("done")

                    table_done.innerHTML += `
        <tr data-id="${idBaris}">
          <td>${data_click.jadwal}</td>
          <td>${data_click.prioritas}</td>
          <td>${data_click.waktu}</td>
        </tr>
      `

                    data_jadwal_done.push(data_click)
                    localStorage.setItem("jadwal done", JSON.stringify(data_jadwal_done))
                } else {
                    baris.classList.remove("done")

                    let rowDone = table_done.querySelector(`tr[data-id="${idBaris}"]`)

                    if (rowDone) {
                        rowDone.remove()
                    }
                }
            })
        })
    })
}


// tombol hapus all simpan
const hapusSemuaSimpan = document.getElementById("hapus_semua_simpan")

hapusSemuaSimpan.addEventListener("click", () => {
    let yakin_simpan = confirm("Yakin ingin menghapus semua data simpan?")

    if (!yakin_simpan) return

  
    let hapus_tr_simpan = table_simpan.querySelectorAll(".baris_jadwal")
    hapus_tr_simpan.forEach(item => item.remove())

    localStorage.removeItem("jadwal")
})


// tombol hapus all done
const hapus_semua_done = document.getElementById("hapus_semua_done")

hapus_semua_done.addEventListener("click", () => {
    let yakin = confirm("Yakin ingin menghapus semua data done?")

    if (!yakin) return

  
    let semuaCheck = document.querySelectorAll(".check_done")
table_done.innerHTML=""
    semuaCheck.forEach((check) => {
        check.checked = false

        let baris = check.closest("tr")
        baris.classList.remove("done")

        localStorage.removeItem("jadwal done")
    })
})