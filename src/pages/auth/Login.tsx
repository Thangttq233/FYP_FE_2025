import React, { useState } from "react";
import type { LoginRequestDto, RegisterRequestDto } from "@/types/auth";
import { authApi } from "./api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterRequestDto>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // Xử lý submit login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Đăng nhập với:", loginData);
      const res = await authApi.login(loginData);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý submit register
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authApi.register(registerData);
      console.log(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        {isRegistering ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <h2 className="text-center text-2xl font-bold">
              Tạo tài khoản mới
            </h2>
            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <Input
                id="fullName"
                name="fullName"
                value={registerData.fullName}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={registerData.dateOfBirth}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <h2 className="text-center text-2xl font-bold">Đăng nhập</h2>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
          </form>
        )}

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-indigo-600 hover:underline"
          >
            {isRegistering
              ? "Đã có tài khoản? Đăng nhập"
              : "Chưa có tài khoản? Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
