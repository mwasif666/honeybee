$(function () {
  // sample product data
  const products = [
    {
      id: 1,
      name: "Ridicu Halo Stud Monte",
      price: 321.25,
      category: "bread",
      img: "https://via.placeholder.com/400x300?text=Bread+1",
      new: true,
    },
    {
      id: 2,
      name: "Ridicu Halo Stud Massa",
      price: 678.0,
      category: "cakes",
      img: "https://via.placeholder.com/400x300?text=Macarons",
    },
    {
      id: 3,
      name: "Ridicu Halo Stud Justo",
      price: 325.0,
      category: "bread",
      img: "https://via.placeholder.com/400x300?text=Cake+2",
    },
    {
      id: 4,
      name: "Ridicu Halo Stud Justo (Donut)",
      price: 365.21,
      category: "donut",
      img: "https://via.placeholder.com/400x300?text=Donut",
    },
    {
      id: 5,
      name: "Diamond Halo Stud Ridicu",
      price: 723.0,
      category: "cakes",
      img: "https://via.placeholder.com/400x300?text=Cake+3",
      discount: 20,
    },
    {
      id: 6,
      name: "Diamond Halo Stud Quis",
      price: 736.0,
      category: "cakes",
      img: "https://via.placeholder.com/400x300?text=Cake+4",
    },
    {
      id: 7,
      name: "Diamond Halo Stud Natoque",
      price: 642.0,
      category: "cupcake",
      img: "https://via.placeholder.com/400x300?text=Cupcake",
      discount: 23,
      new: true,
    },
    {
      id: 8,
      name: "Diamond Halo Stud Monte",
      price: 645.0,
      category: "cupcake",
      img: "https://via.placeholder.com/400x300?text=Cupcake+2",
      discount: 31,
      new: true,
    },
    {
      id: 9,
      name: "Baguette",
      price: 45,
      category: "bread",
      img: "https://via.placeholder.com/400x300?text=Baguette",
    },
    {
      id: 10,
      name: "Sourdough Loaf",
      price: 60,
      category: "bread",
      img: "https://via.placeholder.com/400x300?text=Sourdough",
    },
    {
      id: 11,
      name: "Butter Croissant",
      price: 25,
      category: "pastry",
      img: "https://via.placeholder.com/400x300?text=Croissant",
    },
    {
      id: 12,
      name: "Cinnamon Roll",
      price: 18,
      category: "pastry",
      img: "https://via.placeholder.com/400x300?text=Cinnamon+Roll",
    },
    {
      id: 13,
      name: "Apple Pie",
      price: 55,
      category: "pies",
      img: "https://via.placeholder.com/400x300?text=Apple+Pie",
    },
  ];

  // state
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let currentLayout = "grid-4";

  // helper: categories
  const categories = [...new Set(products.map((p) => p.category))];
  categories.unshift("all");

  // render categories
  categories.forEach((cat) => {
    if (cat === "all") {
      $("#categoryList").append(
        `<li><a href="#" class="category-item" data-cat="all">All</a></li>`
      );
    } else {
      $("#categoryList").append(
        `<li><a href="#" class="category-item" data-cat="${cat}">${
          cat.charAt(0).toUpperCase() + cat.slice(1)
        } <span class="text-muted">(${
          products.filter((p) => p.category === cat).length
        })</span></a></li>`
      );
    }
  });

  // render tags (example)
  $("#tags").html(
    '<span class="badge bg-light border me-1">Organic</span><span class="badge bg-light border me-1">Fresh</span><span class="badge bg-light border me-1">New</span>'
  );

  // render products
  function renderProducts(list) {
    const $wrap = $("#productsWrap");
    $wrap
      .removeClass("layout-grid-4 layout-grid-3 layout-list")
      .addClass("layout-" + currentLayout.replace("grid-", "grid-"));
    $wrap.html("");
    list.forEach((p) => {
      const discount = p.discount
        ? `<div class="badge-discount">-${p.discount}%</div>`
        : "";
      const isNew = p.new ? `<div class="badge-new">NEW</div>` : "";
      const priceHtml = p.discount
        ? `<div class="fw-bold text-dark">$${(
            p.price *
            (1 - p.discount / 100)
          ).toFixed(2)} <small class="text-muted"><s>$${p.price.toFixed(
            2
          )}</s></small></div>`
        : `<div class="fw-bold text-dark">$${p.price.toFixed(2)}</div>`;

      const colClass =
        currentLayout === "list" ? "product-col col-12" : "product-col";

      const cardHtml = `
      <div class="${colClass} d-flex">
        <div class="product-card w-100 position-relative d-flex flex-column ${
          currentLayout === "list" ? "flex-row gap-3" : ""
        }">
          ${discount}
          ${isNew}
          <div class="prod-img ${
            currentLayout === "list" ? "flex-shrink-0 w-50" : ""
          }">
            <img src="${p.img}" alt="${p.name}">
          </div>
          <div class="p-3 d-flex flex-column justify-content-between">
            <div>
              <h6 class="mb-1">${p.name}</h6>
              ${priceHtml}
            </div>
            <div class="mt-3 d-flex justify-content-between align-items-center">
              <button class="btn btn-sm btn-outline-secondary" data-id="${
                p.id
              }">View</button>
              <button class="btn btn-sm btn-theme add-to-cart" data-id="${
                p.id
              }">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      `;

      $wrap.append(cardHtml);
    });

    // set layout wrapper classes for columns
    if (currentLayout === "grid-4") {
      $wrap.find(".product-col").addClass("col-md-4 col-lg-3");
    } else if (currentLayout === "grid-3") {
      $wrap.find(".product-col").addClass("col-md-6 col-lg-4");
    } else {
      $wrap.find(".product-col").addClass("col-12");
    }
  }

  // initial render
  renderProducts(products);
  updateCartCount();

  // layout switch
  $(document).on("click", ".layout-btn", function () {
    $(".layout-btn").removeClass("active");
    $(this).addClass("active");
    const type = $(this).data("layout");
    if (type === "grid-4") {
      currentLayout = "grid-4";
    } else if (type === "grid-3") {
      currentLayout = "grid-3";
    } else {
      currentLayout = "list";
    }
    renderProducts(applyFilters());
  });

  // sorting
  $("#sortBy").on("change", function () {
    renderProducts(applyFilters());
  });

  function applySorting(list) {
    const sort = $("#sortBy").val();
    if (sort === "price-asc")
      return list.slice().sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return list.slice().sort((a, b) => b.price - a.price);
    if (sort === "name-asc")
      return list.slice().sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }

  // filtering
  $(".category-item").on("click", function (e) {
    e.preventDefault();
    $(".category-item").removeClass("fw-bold");
    $(this).addClass("fw-bold");
    renderProducts(applyFilters());
  });

  $("#priceRange").on("input change", function () {
    $("#priceValue").text($(this).val());
    renderProducts(applyFilters());
  });

  $("#clearFilters").on("click", function () {
    $("#priceRange").val(200);
    $("#priceValue").text(200);
    $(".category-item").removeClass("fw-bold");
    $('.category-item[data-cat="all"]').addClass("fw-bold");
    $("#sortBy").val("default");
    renderProducts(products);
  });

  function applyFilters() {
    let list = products.slice();
    // category
    const activeCat = $(".category-item.fw-bold").data("cat") || "all";
    if (activeCat && activeCat !== "all")
      list = list.filter((p) => p.category === activeCat);
    // price
    const maxPrice = parseFloat($("#priceRange").val());
    list = list.filter(
      (p) =>
        p.price <= maxPrice ||
        (p.discount && p.price * (1 - p.discount / 100) <= maxPrice)
    );
    // sorting
    list = applySorting(list);
    return list;
  }

  // add to cart
  $(document).on("click", ".add-to-cart", function () {
    const id = parseInt($(this).data("id"));
    const prod = products.find((p) => p.id === id);
    const existing = cart.find((c) => c.id === id);
    if (existing) existing.qty += 1;
    else
      cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        discount: prod.discount || 0,
        qty: 1,
        img: prod.img,
      });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart");
  });

  function updateCartCount() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    $("#cartCount").text(count);
  }

  // CART page render
  function renderCartPage() {
    if ($("#cartItems").length === 0) return;
    const $body = $("#cartItems");
    $body.html("");
    let total = 0;
    cart.forEach((item, idx) => {
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      const subtotal = price * item.qty;
      total += subtotal;
      $body.append(`
        <tr>
          <td class="d-flex align-items-center gap-3"><img src="${
            item.img
          }" width="60" class="rounded"> <div>${item.name}</div></td>
          <td>$${price.toFixed(2)}</td>
          <td><input type="number" data-index="${idx}" class="form-control qty-input" min="1" style="width:90px" value="${
        item.qty
      }"></td>
          <td>$${subtotal.toFixed(2)}</td>
          <td><button class="btn btn-sm btn-danger remove-item" data-index="${idx}">Remove</button></td>
        </tr>
      `);
    });
    $("#grandTotal").text(total.toFixed(2));
  }

  // on cart page
  if ($("#cartItems").length) {
    renderCartPage();
  }

  $(document).on("change", ".qty-input", function () {
    const idx = $(this).data("index");
    const val = parseInt($(this).val());
    if (val < 1) return;
    cart[idx].qty = val;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
  });

  $(document).on("click", ".remove-item", function () {
    const idx = $(this).data("index");
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
  });

  $("#clearCart").on("click", function () {
    cart = [];
    localStorage.setItem("cart", "[]");
    renderCartPage();
    updateCartCount();
  });

  // CHECKOUT page
  if ($("#orderSummary").length) {
    const $sum = $("#orderSummary");
    $sum.html("");
    let tot = 0;
    cart.forEach((it) => {
      const price = it.discount ? it.price * (1 - it.discount / 100) : it.price;
      const subtotal = price * it.qty;
      tot += subtotal;
      $sum.append(
        `<li class="list-group-item d-flex justify-content-between">${
          it.name
        } x ${it.qty}<span>$${subtotal.toFixed(2)}</span></li>`
      );
    });
    $("#checkoutTotal").text(tot.toFixed(2));

    $("#checkoutForm").on("submit", function (e) {
      e.preventDefault();
      // simple demo: clear cart and show message
      alert("Order placed! Thank you — this is a demo.");
      cart = [];
      localStorage.setItem("cart", "[]");
      updateCartCount();
      window.location.href = "index.html";
    });
  }

  // when returning to shop page, update cart count
  updateCartCount();
});
