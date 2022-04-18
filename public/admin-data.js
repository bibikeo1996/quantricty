const Data = {
  getDuAn: function () {
    axios.get('/api/duan/getnduan').then(function (response) {
        if (response.data.code == 1000) {
            response.data.data.forEach(element => {
                $('.danhsach').append(Data.buildDuAn(element))
            });
        }
    })
  },
}
