<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OOJS Példa</title>
</head>
<body>
    <h2>Objektumorientált JavaScript alkalmazás</h2>
    <script>
        class MenuItem {
            constructor(name, price) {
                this.name = name;
                this.price = price;
            }
            render() {
                let item = document.createElement("div");
                item.textContent = `${this.name} - ${this.price} Ft`;
                item.style.border = "1px solid black";
                item.style.padding = "10px";
                item.style.margin = "5px";
                return item;
            }
        }

        class Menu extends MenuItem {
            constructor(name, price, category) {
                super(name, price);
                this.category = category;
            }
            render() {
                let item = super.render();
                let categoryTag = document.createElement("span");
                categoryTag.textContent = ` (${this.category})`;
                categoryTag.style.fontWeight = "bold";
                item.appendChild(categoryTag);
                return item;
            }
        }

        class MenuApp {
            constructor() {
                this.menuItems = [];
            }
            addMenuItem(item) {
                this.menuItems.push(item);
                this.render();
            }
            render() {
                document.body.innerHTML = "";
                let title = document.createElement("h2");
                title.textContent = "Menü";
                document.body.appendChild(title);
                this.menuItems.forEach(item => document.body.appendChild(item.render()));
            }
        }

        let app = new MenuApp();
        app.addMenuItem(new Menu("Pizza", 2500, "Főétel"));
        app.addMenuItem(new Menu("Sült krumpli", 800, "Köret"));
        app.addMenuItem(new Menu("Üdítő", 500, "Ital"));
    </script>
</body>
</html>
