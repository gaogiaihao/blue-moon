// ==========================================
// BLUE MOON SHOP - GIỎ HÀNG
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("blueMoonCart")
) || [];


// ==========================================
// CHUYỂN GIÁ VỀ NUMBER
// ==========================================

function getNumberPrice(price) {

    if (typeof price === "number") {
        return price;
    }

    let cleanPrice = String(price)
        .replace(/[^\d]/g, "");

    return Number(cleanPrice) || 0;
}


// ==========================================
// LƯU GIỎ HÀNG
// ==========================================

function saveCart() {

    localStorage.setItem(
        "blueMoonCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


// ==========================================
// HIỂN THỊ SỐ LƯỢNG GIỎ HÀNG
// ==========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    let quantity = 0;

    cart.forEach(item => {

        quantity +=
            Number(item.quantity) || 0;

    });

    cartCount.innerText = quantity;
}


// ==========================================
// THÊM SẢN PHẨM
// ==========================================

function addToCart(name, price) {

    const numberPrice =
        getNumberPrice(price);

    const existing =
        cart.find(item =>
            item.name === name
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity) + 1;

    } else {

        cart.push({

            name: name,

            price: numberPrice,

            quantity: 1

        });

    }


    saveCart();


    alert(
        "✅ Đã thêm " +
        name +
        " vào giỏ hàng!"
    );
}


// ==========================================
// THÊM NHIỀU SẢN PHẨM
// ==========================================

function addMultipleToCart(
    name,
    price,
    quantity
) {

    const numberPrice =
        getNumberPrice(price);

    const numberQuantity =
        Number(quantity) || 1;


    const existing =
        cart.find(item =>
            item.name === name
        );


    if (existing) {

        existing.quantity =
            Number(existing.quantity) +
            numberQuantity;

    } else {

        cart.push({

            name: name,

            price: numberPrice,

            quantity: numberQuantity

        });

    }


    saveCart();


    alert(
        "✅ Đã thêm " +
        numberQuantity +
        " sản phẩm vào giỏ hàng!"
    );
}


// ==========================================
// MỞ GIỎ
// ==========================================

function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    if (!modal) return;

    renderCart();

    modal.classList.add("show");
}


// ==========================================
// ĐÓNG GIỎ
// ==========================================

function closeCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    if (!modal) return;

    modal.classList.remove("show");
}


// ==========================================
// HIỂN THỊ GIỎ HÀNG
// ==========================================

// ==========================================
// HIỂN THỊ CHI TIẾT SẢN PHẨM
// ==========================================

function showProduct(
    name,
    icon,
    description,
    price
) {

    const modal =
        document.getElementById(
            "productModal"
        );

    const modalIcon =
        document.getElementById(
            "modalIcon"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    const modalAddButton =
        document.getElementById(
            "modalAddButton"
        );


    if (!modal) return;


    // ======================================
    // TÊN SẢN PHẨM
    // ======================================

    if (modalName) {

        modalName.innerText =
            name;

    }


    // ======================================
    // MÔ TẢ
    // ======================================

    if (modalDescription) {

        modalDescription.innerText =
            description;

    }


    // ======================================
    // GIÁ
    // ======================================

    if (modalPrice) {

        modalPrice.innerText =
            price;

    }


    // ======================================
    // LẤY ĐÚNG HÌNH SẢN PHẨM ĐANG BẤM
    // ======================================

    if (modalIcon) {

        let productImage = null;

        const productCards =
            document.querySelectorAll(
                ".product-card"
            );


        productCards.forEach(
            function (card) {

                const cardName =
                    card.getAttribute(
                        "data-name"
                    ) || "";


                const title =
                    card.querySelector("h3");


                const titleName =
                    title
                        ? title.innerText
                        : "";


                if (
                    cardName === name ||
                    titleName === name ||
                    cardName.includes(name) ||
                    name.includes(cardName)
                ) {

                    const image =
                        card.querySelector(
                            ".product-image img"
                        );


                    if (image) {

                        productImage =
                            image.cloneNode(true);

                    }

                }

            }
        );


        // Xóa ảnh cũ trong popup

        modalIcon.innerHTML = "";


        // Nếu tìm thấy ảnh thì dùng đúng ảnh đó

        if (productImage) {

            productImage.style.maxWidth =
                "180px";

            productImage.style.maxHeight =
                "180px";

            productImage.style.width =
                "auto";

            productImage.style.height =
                "auto";

            productImage.style.objectFit =
                "contain";

            productImage.style.borderRadius =
                "18px";

            productImage.style.display =
                "block";

            productImage.style.margin =
                "auto";


            modalIcon.appendChild(
                productImage
            );

        }

        // Nếu không tìm được ảnh thì giữ icon

        else {

            modalIcon.innerText =
                icon || "🛍️";

        }

    }


    // ======================================
    // NÚT THÊM VÀO GIỎ
    // ======================================

    if (modalAddButton) {

        modalAddButton.onclick =
            function () {

                addToCart(
                    name,
                    price
                );

            };

    }


    // ======================================
    // MỞ POPUP
    // ======================================

    modal.classList.add("show");
}


    cartItems.innerHTML = "";


    // ======================================
    // GIỎ TRỐNG
    // ======================================

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div style="
                    font-size:50px;
                    margin-bottom:10px;
                ">
                    🛒
                </div>

                <p>
                    Giỏ hàng của bạn đang trống.
                </p>

            </div>
        `;

        cartTotal.innerText = "0đ";

        return;
    }


    let total = 0;


    // ======================================
    // HIỂN THỊ TỪNG SẢN PHẨM
    // ======================================

    cart.forEach((item, index) => {

        const price =
            getNumberPrice(item.price);

        const quantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * quantity;


        total += itemTotal;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `
            <div style="
                flex:1;
            ">

                <strong>
                    ${item.name}
                </strong>

                <div style="
                    color:#1677ff;
                    margin-top:5px;
                ">
                    ${price.toLocaleString("vi-VN")}đ
                </div>

            </div>

            <div style="
                display:flex;
                align-items:center;
                gap:6px;
            ">

                <button
                    onclick="decreaseQuantity(${index})"
                    style="
                        width:32px;
                        height:32px;
                        padding:0;
                        border:none;
                        border-radius:8px;
                        background:#e8f3ff;
                        color:#1677ff;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    −
                </button>

                <strong>
                    ${quantity}
                </strong>

                <button
                    onclick="increaseQuantity(${index})"
                    style="
                        width:32px;
                        height:32px;
                        padding:0;
                        border:none;
                        border-radius:8px;
                        background:#1677ff;
                        color:white;
                        cursor:pointer;
                        font-weight:bold;
                    "
                >
                    +
                </button>

                <button
                    onclick="removeCartItem(${index})"
                    style="
                        width:32px;
                        height:32px;
                        padding:0;
                        border:none;
                        border-radius:8px;
                        background:#ffe8e8;
                        cursor:pointer;
                    "
                >
                    🗑️
                </button>

            </div>
        `;


        cartItems.appendChild(div);

    });


    cartTotal.innerText =
        total.toLocaleString("vi-VN") +
        "đ";



// ==========================================
// TĂNG SỐ LƯỢNG
// ==========================================

function increaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity) + 1;

    saveCart();

    renderCart();
}


// ==========================================
// GIẢM SỐ LƯỢNG
// ==========================================

function decreaseQuantity(index) {

    if (!cart[index]) return;

    cart[index].quantity =
        Number(cart[index].quantity);


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    renderCart();
}


// ==========================================
// XÓA SẢN PHẨM
// ==========================================

function removeCartItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    saveCart();

    renderCart();
}


// ==========================================
// THANH TOÁN
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "🛒 Giỏ hàng đang trống!"
        );

        return;
    }


    let total = 0;


    cart.forEach(item => {

        total +=
            getNumberPrice(item.price) *
            Number(item.quantity);

    });


    alert(
        "🎉 Đặt hàng thành công!\n\n" +
        "Tổng tiền: " +
        total.toLocaleString("vi-VN") +
        "đ\n\n" +
        "📞 Liên hệ: 000000000"
    );


    cart = [];


    localStorage.removeItem(
        "blueMoonCart"
    );


    updateCartCount();

    renderCart();
}


// ==========================================
// HIỂN THỊ CHI TIẾT SẢN PHẨM
// ==========================================

// ==========================================
// HIỂN THỊ CHI TIẾT SẢN PHẨM
// ==========================================

function showProduct(
    name,
    icon,
    description,
    price
) {

    const modal =
        document.getElementById("productModal");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalName =
        document.getElementById("modalName");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalPrice =
        document.getElementById("modalPrice");

    const modalAddButton =
        document.getElementById("modalAddButton");


    if (!modal) return;


    // ======================================
    // TÊN
    // ======================================

    modalName.innerText = name;


    // ======================================
    // MÔ TẢ
    // ======================================

    modalDescription.innerText =
        description;


    // ======================================
    // GIÁ
    // ======================================

    modalPrice.innerText =
        price;


    // ======================================
    // LẤY ĐÚNG ẢNH TỪ SẢN PHẨM ĐANG BẤM
    // ======================================

    if (modalIcon) {

        let imageSrc = "";

        // Lấy đúng thẻ sản phẩm vừa được bấm
        const productCard =
            event.currentTarget;

        if (productCard) {

            const productImage =
                productCard.querySelector(
                    ".product-image img"
                );

            if (productImage) {

                imageSrc =
                    productImage.src;

            }

        }


        // Xóa nội dung ảnh cũ

        modalIcon.innerHTML = "";


        // Hiển thị đúng ảnh sản phẩm

        if (imageSrc !== "") {

            const img =
                document.createElement("img");

            img.src = imageSrc;

            img.alt = name;

            img.style.width = "180px";
            img.style.height = "180px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "18px";
            img.style.display = "block";
            img.style.margin = "auto";

            modalIcon.appendChild(img);

        } else {

            // Nếu không có ảnh thì dùng emoji

            modalIcon.innerText =
                icon || "🛍️";

        }

    }


    // ======================================
    // NÚT THÊM VÀO GIỎ
    // ======================================

    modalAddButton.onclick =
        function () {

            addToCart(
                name,
                price
            );

        };


    // ======================================
    // MỞ POPUP
    // ======================================

    modal.classList.add("show");
} {

    const modal =
        document.getElementById(
            "productModal"
        );

    const modalIcon =
        document.getElementById(
            "modalIcon"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    const modalAddButton =
        document.getElementById(
            "modalAddButton"
        );


    if (!modal) return;


    // TÊN

    if (modalName) {

        modalName.innerText =
            name;

    }


    // MÔ TẢ

    if (modalDescription) {

        modalDescription.innerText =
            description;

    }


    // GIÁ

    if (modalPrice) {

        modalPrice.innerText =
            price;

    }


    // ẢNH SẢN PHẨM

    if (modalIcon) {

        modalIcon.innerHTML =
            icon || "🛍️";

    }


    // NÚT THÊM VÀO GIỎ

    if (modalAddButton) {

        modalAddButton.onclick =
            function () {

                addToCart(
                    name,
                    price
                );

            };

    }


    // MỞ POPUP

    modal.classList.add("show");
}


// ==========================================
// ĐÓNG POPUP SẢN PHẨM
// ==========================================

function closeModal() {

    const modal =
        document.getElementById(
            "productModal"
        );

    if (!modal) return;

    modal.classList.remove("show");
}


// ==========================================
// TÌM KIẾM SẢN PHẨM
// ==========================================

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) return;

    const keyword =
        input.value
            .toLowerCase()
            .trim();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(
        function (product) {

            const name =
                (
                    product.getAttribute(
                        "data-name"
                    ) || ""
                ).toLowerCase();


            if (
                name.includes(keyword)
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );
}


// ==========================================
// FOCUS Ô TÌM KIẾM
// ==========================================

function focusSearch() {

    const searchArea =
        document.getElementById(
            "searchArea"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchArea) {

        searchArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    if (searchInput) {

        searchInput.focus();

    }
}


// ==========================================
// KHI MỞ TRANG
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "blueMoonCart"
                )
            ) || [];


        updateCartCount();

    }
);