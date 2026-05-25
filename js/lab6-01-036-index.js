const loginBtn = document.getElementById('loginBtn');
const mask = document.getElementById('mask');
const loginBox = document.getElementById('loginBox');
const closeLogin = document.getElementById('closeLogin');
const openSearch = document.getElementById('openSearch');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchType = document.getElementById('searchType');
const searchResult = document.getElementById('searchResult');
const user2 = document.getElementById('user2');
const userTip = document.getElementById('userTip');
const pwd2 = document.getElementById('pwd2');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

const books = [
    { id: 1, name: '深入理解计算机系统', author: 'Randal E.Bryant', category: '计算机技术', price: 89 },
    { id: 2, name: 'C++ Primer', author: 'Stanley B.Lippman', category: '计算机技术', price: 128 },
    { id: 3, name: '数据结构与算法', author: '严蔚敏', category: '计算机技术', price: 59 },
    { id: 5, name: '剑来', author: '烽火戏诸侯', category: '文学小说', price: 76 },
    { id: 6, name: '吞噬星空', author: '我吃西红柿', category: '文学小说', price: 69 },
    { id: 7, name: '呐喊', author: '鲁迅', category: '文学小说', price: 32 },
    { id: 8, name: '骆驼祥子', author: '老舍', category: '文学小说', price: 29 }
];

const user = {
    username: '',
    isLogin: false,
    cart: [],
    login(name) {
        this.username = name;
        this.isLogin = true;
    },
    logout() {
        this.username = '';
        this.isLogin = false;
        this.cart = [];
    },
    addBook(book) {
        this.cart.push(book);
        alert(`成功加入购物车：${book.name}`);
    },
    showCart() {
        if (this.cart.length === 0) {
            alert('购物车暂无商品');
            return;
        }
        let str = '===== 我的购物车 =====\n';
        let total = 0;
        this.cart.forEach((item, index) => {
            str += `${index + 1}.${item.name}  ${item.price}元\n`;
            total += item.price;
        });
        str += `====================\n合计总价：${total}元`;
        alert(str);
    }
};

function addCart(id) {
    if (!user.isLogin) {
        alert('请先登录账号');
        mask.classList.add('active');
        loginBox.classList.add('active');
        return;
    }
    let book = books.find(item => item.id === id);
    if (book) {
        user.addBook(book);
    }
}

searchInput.addEventListener('input', function () {
    let keyword = this.value.trim().toLowerCase();
    let type = searchType.value;
    let result = [];
    if (keyword) {
        result = books.filter(book => {
            if (type === 'all') {
                return book.name.toLowerCase().includes(keyword) || book.author.toLowerCase().includes(keyword) || book.category.toLowerCase().includes(keyword);
            } else if (type === 'title') {
                return book.name.toLowerCase().includes(keyword);
            } else if (type === 'author') {
                return book.author.toLowerCase().includes(keyword);
            } else if (type === 'category') {
                return book.category.toLowerCase().includes(keyword);
            }
        });
    }
    if (result.length === 0) {
        searchResult.innerHTML = '<div class="search-result-item">未找到相关图书</div>';
    } else {
        searchResult.innerHTML = '';
        result.forEach(book => {
            let div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerText = `${book.name} | ${book.author} | ${book.category} | ${book.price}元`;
            div.onclick = function () {
                addCart(book.id);
            };
            searchResult.appendChild(div);
        });
    }
});

document.querySelector('.cart-btn').onclick = function (e) {
    e.preventDefault();
    user.showCart();
};

loginBtn.onclick = function () {
    mask.classList.add('active');
    loginBox.classList.add('active');
};
closeLogin.onclick = function () {
    mask.classList.remove('active');
    loginBox.classList.remove('active');
};
mask.onclick = function () {
    mask.classList.remove('active');
    loginBox.classList.remove('active');
    searchModal.classList.remove('active');
};

openSearch.onclick = function () {
    mask.classList.add('active');
    searchModal.classList.add('active');
};
closeSearch.onclick = function () {
    mask.classList.remove('active');
    searchModal.classList.remove('active');
};

function switchTab(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    if (type === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

user2.addEventListener('blur', function () {
    let val = this.value.trim();
    let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneReg = /^1[3-9]\d{9}$/;
    if (!val) {
        userTip.innerText = '不能为空';
        userTip.style.color = 'red';
    } else if (!emailReg.test(val) && !phoneReg.test(val)) {
        userTip.innerText = '格式错误';
        userTip.style.color = 'red';
    } else {
        userTip.innerText = '格式正确';
        userTip.style.color = 'green';
    }
});

pwd2.addEventListener('input', function () {
    let len = this.value.length;
    if (len < 6) {
        strengthBar.style.width = '33%';
        strengthBar.style.background = 'red';
        strengthText.innerText = '弱';
    } else if (len < 10) {
        strengthBar.style.width = '66%';
        strengthBar.style.background = 'orange';
        strengthText.innerText = '中';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = 'green';
        strengthText.innerText = '强';
    }
});

function register() {
    let username = document.getElementById('user2').value.trim();
    let pwd = document.getElementById('pwd2').value.trim();
    let repwd = document.getElementById('pwd3').value.trim();
    if (!username || !pwd || !repwd) {
        alert('信息不能为空');
        return;
    }
    if (pwd !== repwd) {
        alert('两次输入密码不一致');
        return;
    }
    localStorage.setItem(username, pwd);
    alert('注册成功，请前往登录');
    switchTab('login');
}

function login() {
    let username = document.getElementById('user1').value.trim();
    let pwd = document.getElementById('pwd1').value.trim();
    if (localStorage.getItem(username) === pwd) {
        user.login(username);
        alert('登录成功，可正常使用购物车与搜索功能');
        mask.classList.remove('active');
        loginBox.classList.remove('active');
    } else {
        alert('用户名或密码错误');
    }
}