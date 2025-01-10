$(document).ready(() => {
    const apiTiki =
      "https://tiki.vn/api/personalish/v1/blocks/listings?limit=40&include=advertisement&is_mweb=1&aggregations=2&version=home-persionalized&_v=&trackity_id=6d0b672c-dac5-f6e4-fea7-e6d30b8b1511&category=1789&page=1";
  
    function fetchProducts() {
      fetch(apiTiki)
        .then((response) => response.json())
        .then((data) => {
          const products = data.data; 
          renderProducts(products);
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu từ Tiki:", error));
    }

    function renderProducts(products) {
      const productList = $("#product-list");
      productList.empty();
  
      products.forEach((product) => {
        const productHTML = `
          <div class="product">
            <img src="${product.thumbnail_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} VNĐ</p>
            <button class="btnAddToCart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Thêm vào giỏ</button>
          </div>
        `;
        productList.append(productHTML);
      });
  
      $(".btnAddToCart").on("click", function () {
        const productId = $(this).data("id");
        const productName = $(this).data("name");
        const productPrice = $(this).data("price");
  
        addToCart(productId, productName, productPrice);
      });
    }

    function addToCart(id, name, price) {
      alert(`Đã thêm sản phẩm: ${name} (${price.toLocaleString()} VNĐ) vào giỏ hàng!`);
      console.log(`Sản phẩm được thêm: ID=${id}, Tên=${name}, Giá=${price}`);
    }

    fetchProducts();
  });
  