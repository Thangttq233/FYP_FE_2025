import { useEffect, useState } from "react";
import { adminhApi } from "./api";
import type { CreateCategoryDto, CategoryDto } from "@/types/categories";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const AdminCategories = () => {
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: "",
    description: "",
  });
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCategories = async () => {
    try {
      const res = await adminhApi.getCategories();
      setCategories(res || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      await adminhApi.createCategory(formData);
      setFormData({ name: "", description: "" }); // reset form
      setOpen(false); // đóng modal
      fetchCategories(); // reload list
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      await adminhApi.deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (category: CategoryDto) => {
    console.log("Edit category:", category);
    // Có thể mở dialog edit tương tự
  };

  return (
    <div className="p-8 bg-stone-50 min-h-screen font-sans space-y-6">
      {/* Dialog Create */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter category description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="flex justify-between items-center m-5">
          <h2 className="text-xl font-semibold">Danh mục</h2>
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm Danh mục
          </Button>
        </div>
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Tên</th>
              <th className="p-2 border text-center">Tác vụ</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={2} className="text-center p-4 text-gray-500">
                  Không có danh mục nào.
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{c.name}</td>
                  <td className="p-2 border text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleEdit(c)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(c.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategories;
