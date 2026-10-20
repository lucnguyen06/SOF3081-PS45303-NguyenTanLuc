<template>
    <div>
        <h2>Employee Management</h2>
        <div>
            <input v-model="form.id" placeholder="Id" style="width: 200px;" /><br />
            <input v-model="form.name" placeholder="Name" style="width: 200px;" /><br />
            <label>
                <input type="radio" value="true" v-model="form.gender" /> Male
            </label>
            <label>
                <input type="radio" value="false" v-model="form.gender" /> Female
            </label>
            <br />
            <input v-model="form.salary" placeholder="Salary" type="number" style="width: 200px;" /><br />
            <button @click="create">Create</button>
            <button @click="update">Update</button>
            <button @click="deleteEmployee">Delete</button>
            <button @click="resetForm">Reset</button>
        </div>
        <hr />
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                    <td>{{ employee.id }}</td>
                    <td>{{ employee.name }}</td>
                    <td>{{ employee.gender === "true" ? "Male" : "Female" }}</td>
                    <td>{{ employee.salary }}</td>
                    <td><a href="#" @click.prevent="edit(employee.id)">Edit</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            apiUrl: "http://localhost:8080/SOF3011Slide7/employees",
            employees: [],
            form: {
                id: "",
                name: "",
                gender: "true",
                salary: 0,
            },
        };
    },
    methods: {
        // Chuyển đổi gender thành boolean khi tạo hoặc cập nhật
        getEmployeeData() {
            return {
                ...this.form,
                gender: this.form.gender === "true", // Chuyển "true"/"false" thành boolean
            };
        },
        // Tải tất cả dữ liệu
        async loadAll() {
            try {
                const response = await axios.get(this.apiUrl);
                // Chuyển boolean gender thành chuỗi để hiển thị trong form
                this.employees = response.data.map(emp => ({
                    ...emp,
                    gender: emp.gender.toString(),
                }));
            } catch (error) {
                console.error("Error loading employees:", error);
            }
        },
        // Tạo mới nhân viên
        async create() {
            try {
                const newEmployee = this.getEmployeeData();
                await axios.post(this.apiUrl, newEmployee);
                this.loadAll();
                this.resetForm();
            } catch (error) {
                console.error("Error creating employees:", error);
            }
        },
        // Cập nhật nhân viên
        async update() {
            try {
                const { id } = this.form;
                if (!id) {
                    alert("Please select an employee to update.");
                    return;
                }
                const updatedEmployee = this.getEmployeeData();
                await axios.put(`${this.apiUrl}/${id}`, updatedEmployee);
                this.loadAll();
            } catch (error) {
                console.error("Error updating employees:", error);
            }
        },
        // Xóa nhân viên
        async deleteEmployee() {
            try {
                const { id } = this.form;
                if (!id) {
                    alert("Please select an employees to delete.");
                    return;
                }
                await axios.delete(`${this.apiUrl}/${id}`);
                this.loadAll();
                this.resetForm();
            } catch (error) {
                console.error("Error deleting employees:", error);
            }
        },
        // Chỉnh sửa nhân viên
        async edit(id) {
            try {
                const response = await axios.get(`${this.apiUrl}/${id}`);
                // Chuyển boolean gender thành chuỗi để hiển thị
                this.form = { ...response.data, gender: response.data.gender.toString() };
            } catch (error) {
                console.error("Error editing employees:", error);
            }
        },
    },
    getEmployeeData() {
        return {
            ...this.form,
            gender: this.form.gender === "true",
            salary: parseFloat(this.form.salary) || 0,
        };
    },

    mounted() {
        this.loadAll();
    },
};
</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid black;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

input {
    margin: 5px;
    padding: 5px;
}

button {
    margin: 5px;
    padding: 8px 12px;
    cursor: pointer;
}

button:hover {
    background-color: #f2f2f2;
}
</style>