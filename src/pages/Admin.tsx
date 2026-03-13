import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useIsAdmin } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Users, 
  FileText, 
  Check, 
  X, 
  Clock, 
  Loader2,
  RefreshCw,
  Eye,
  UserCheck,
  BookOpen,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  Upload,
  File,
  GraduationCap,
} from "lucide-react";
import { PracticumBuilder } from "@/components/admin/PracticumBuilder";

// Types for admin data
type Profile = {
  id: string;
  full_name: string | null;
  role: string;
  specialty_role: string | null;
  avatar_url: string | null;
  created_at: string;
};

type UserProgress = {
  id: string;
  user_id: string;
  task_id: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
  profiles?: {
    full_name: string | null;
  };
};

type Method = {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  level: string;
  direction: string;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  icon_name: string;
  format: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

type Stats = {
  totalUsers: number;
  totalMethods: number;
  completedTasks: number;
};

// Empty method template for creating new ones
const emptyMethod: Omit<Method, "id" | "created_at" | "updated_at"> = {
  title: "",
  description: "",
  tags: [],
  level: "beginner",
  direction: "ai",
  file_url: null,
  file_name: null,
  file_size: null,
  icon_name: "FileText",
  format: "pdf",
  is_active: true,
};

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const isAdmin = useIsAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalMethods: 0,
    completedTasks: 0,
  });
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [methods, setMethods] = useState<Method[]>([]);

  // Dialog state for method editing
  const [methodDialogOpen, setMethodDialogOpen] = useState(false);
  const [methodDialogMode, setMethodDialogMode] = useState<"create" | "edit">("create");
  const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
  const [methodForm, setMethodForm] = useState(emptyMethod);
  const [methodLoading, setMethodLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [tagsInput, setTagsInput] = useState("");

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState<Method | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав для просмотра этой страницы",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [authLoading, user, isAdmin, navigate, toast]);

  // Fetch all admin data
  const fetchData = async () => {
    if (!isAdmin) return;
    
    setLoading(true);
    try {
      const [
        profilesRes,
        methodsRes,
        progressRes,
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("methods").select("*").order("created_at", { ascending: false }),
        supabase.from("user_progress").select("*, profiles(full_name)"),
      ]);

      if (profilesRes.data) setProfiles(profilesRes.data);
      if (methodsRes.data) setMethods(methodsRes.data);
      if (progressRes.data) setProgress(progressRes.data);

      setStats({
        totalUsers: profilesRes.data?.length || 0,
        totalMethods: methodsRes.data?.length || 0,
        completedTasks: progressRes.data?.filter(p => p.completed).length || 0,
      });

    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Handle role change
  const handleRoleChange = async (profileId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", profileId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Роль пользователя изменена",
      });

      fetchData();
    } catch (error) {
      console.error("Error changing role:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить роль",
        variant: "destructive",
      });
    }
  };

  // Handle specialty role change
  const handleSpecialtyRoleChange = async (profileId: string, newRole: string | null) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ specialty_role: newRole })
        .eq("id", profileId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Профессиональная роль пользователя изменена",
      });

      fetchData();
    } catch (error) {
      console.error("Error changing specialty role:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить профессиональную роль",
        variant: "destructive",
      });
    }
  };

  // Open method dialog for creating
  const openCreateMethodDialog = () => {
    setMethodDialogMode("create");
    setSelectedMethod(null);
    setMethodForm(emptyMethod);
    setTagsInput("");
    setMethodDialogOpen(true);
  };

  // Open method dialog for editing
  const openEditMethodDialog = (method: Method) => {
    setMethodDialogMode("edit");
    setSelectedMethod(method);
    setMethodForm({
      title: method.title,
      description: method.description || "",
      tags: method.tags || [],
      level: method.level,
      direction: method.direction,
      file_url: method.file_url,
      file_name: method.file_name,
      file_size: method.file_size,
      icon_name: method.icon_name,
      format: method.format,
      is_active: method.is_active,
    });
    setTagsInput((method.tags || []).join(", "));
    setMethodDialogOpen(true);
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      // Generate unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${file.name}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("methods")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("methods")
        .getPublicUrl(fileName);

      // Update form
      setMethodForm(prev => ({
        ...prev,
        file_url: urlData.publicUrl,
        file_name: file.name,
        file_size: file.size,
        format: fileExt || "pdf",
      }));

      toast({
        title: "Успешно",
        description: "Файл загружен",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить файл",
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Save method (create or update)
  const handleSaveMethod = async () => {
    if (!methodForm.title.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название методички",
        variant: "destructive",
      });
      return;
    }

    setMethodLoading(true);
    try {
      // Parse tags from input
      const tags = tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const methodData = {
        ...methodForm,
        tags,
        description: methodForm.description || null,
      };

      if (methodDialogMode === "create") {
        const { error } = await supabase
          .from("methods")
          .insert(methodData);

        if (error) throw error;

        toast({
          title: "Успешно",
          description: "Методичка создана",
        });
      } else if (selectedMethod) {
        const { error } = await supabase
          .from("methods")
          .update(methodData)
          .eq("id", selectedMethod.id);

        if (error) throw error;

        toast({
          title: "Успешно",
          description: "Методичка обновлена",
        });
      }

      setMethodDialogOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving method:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить методичку",
        variant: "destructive",
      });
    } finally {
      setMethodLoading(false);
    }
  };

  // Delete method
  const handleDeleteMethod = async () => {
    if (!methodToDelete) return;

    setMethodLoading(true);
    try {
      // Delete file from storage if exists
      if (methodToDelete.file_url) {
        const fileName = methodToDelete.file_url.split("/").pop();
        if (fileName) {
          await supabase.storage.from("methods").remove([fileName]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("methods")
        .delete()
        .eq("id", methodToDelete.id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Методичка удалена",
      });

      setDeleteDialogOpen(false);
      setMethodToDelete(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting method:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить методичку",
        variant: "destructive",
      });
    } finally {
      setMethodLoading(false);
    }
  };

  // Toggle method active status
  const handleToggleActive = async (method: Method) => {
    try {
      const { error } = await supabase
        .from("methods")
        .update({ is_active: !method.is_active })
        .eq("id", method.id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: method.is_active ? "Методичка скрыта" : "Методичка опубликована",
      });

      fetchData();
    } catch (error) {
      console.error("Error toggling method:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось изменить статус",
        variant: "destructive",
      });
    }
  };

  // Level badge helper
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return <Badge className="bg-green-500/10 text-green-600">Начальный</Badge>;
      case "intermediate":
        return <Badge className="bg-yellow-500/10 text-yellow-600">Средний</Badge>;
      case "advanced":
        return <Badge className="bg-red-500/10 text-red-600">Продвинутый</Badge>;
      default:
        return <Badge variant="secondary">{level}</Badge>;
    }
  };

  // Direction label helper
  const getDirectionLabel = (direction: string) => {
    const labels: Record<string, string> = {
      ai: "ИИ",
      ml: "ML",
      neural: "Нейросети",
      prompting: "Промтинг",
    };
    return labels[direction] || direction;
  };

  // Format file size
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Загрузка админ-панели...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-6 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Админ-панель</h1>
                <p className="text-muted-foreground">Управление платформой Internium</p>
              </div>
            </div>
            <Button onClick={fetchData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="practicum" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Практикум
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="methods" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Методички
              </TabsTrigger>
              <TabsTrigger value="progress" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Прогресс
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="glass-panel border-white/40">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">зарегистрировано на платформе</p>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/40">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Методички</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.totalMethods}</div>
                    <p className="text-xs text-muted-foreground">обучающих материалов</p>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/40">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Выполнено заданий</CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stats.completedTasks}</div>
                    <p className="text-xs text-muted-foreground">заданий практикума</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Practicum Tab */}
            <TabsContent value="practicum">
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <CardTitle>Конструктор практикумов</CardTitle>
                  <CardDescription>Создание и редактирование курсов, уроков и блоков контента</CardDescription>
                </CardHeader>
                <CardContent>
                  <PracticumBuilder />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <CardTitle>Пользователи</CardTitle>
                  <CardDescription>Управление пользователями и их ролями</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Имя</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Проф. роль</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">
                            {profile.full_name || "Без имени"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={profile.role === "admin" ? "default" : "secondary"}>
                              {profile.role === "admin" ? "Админ" : "Студент"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={profile.specialty_role || "none"}
                              onValueChange={(value) =>
                                handleSpecialtyRoleChange(
                                  profile.id,
                                  value === "none" ? null : value
                                )
                              }
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">Не выбрана</SelectItem>
                                <SelectItem value="developer">Разработчик</SelectItem>
                                <SelectItem value="analyst">Аналитик</SelectItem>
                                <SelectItem value="marketer">Маркетолог</SelectItem>
                                <SelectItem value="designer">Дизайнер</SelectItem>
                                <SelectItem value="tester">Тестировщик</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{formatDate(profile.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <Select
                              value={profile.role}
                              onValueChange={(value) => handleRoleChange(profile.id, value)}
                              disabled={profile.id === user?.id}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">Студент</SelectItem>
                                <SelectItem value="admin">Админ</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Methods Tab */}
            <TabsContent value="methods">
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Методички</CardTitle>
                      <CardDescription>Управление обучающими материалами</CardDescription>
                    </div>
                    <Button onClick={openCreateMethodDialog}>
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {methods.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Методичек пока нет</p>
                      <Button className="mt-4" onClick={openCreateMethodDialog}>
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить первую методичку
                      </Button>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Название</TableHead>
                          <TableHead>Направление</TableHead>
                          <TableHead>Уровень</TableHead>
                          <TableHead>Файл</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead className="text-right">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {methods.map((method) => (
                          <TableRow key={method.id} className={!method.is_active ? "opacity-50" : ""}>
                            <TableCell className="font-medium max-w-xs">
                              <div className="truncate">{method.title}</div>
                              {method.tags && method.tags.length > 0 && (
                                <div className="flex gap-1 mt-1 flex-wrap">
                                  {method.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {method.tags.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{method.tags.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>{getDirectionLabel(method.direction)}</TableCell>
                            <TableCell>{getLevelBadge(method.level)}</TableCell>
                            <TableCell>
                              {method.file_url ? (
                                <div className="flex items-center gap-1 text-sm">
                                  <File className="h-4 w-4" />
                                  <span className="truncate max-w-[100px]">{method.file_name}</span>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={method.is_active}
                                onCheckedChange={() => handleToggleActive(method)}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex gap-1 justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditMethodDialog(method)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => {
                                    setMethodToDelete(method);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress">
              <Card className="glass-panel border-white/40">
                <CardHeader>
                  <CardTitle>Прогресс студентов</CardTitle>
                  <CardDescription>Отслеживание выполнения заданий практикума</CardDescription>
                </CardHeader>
                <CardContent>
                  {progress.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Данных о прогрессе пока нет</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Пользователь</TableHead>
                          <TableHead>Задание</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Дата выполнения</TableHead>
                          <TableHead>Заметки</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {progress.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.profiles?.full_name || "Без имени"}
                            </TableCell>
                            <TableCell>{item.task_id}</TableCell>
                            <TableCell>
                              {item.completed ? (
                                <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                                  <Check className="w-3 h-3 mr-1" />
                                  Выполнено
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
                                  <Clock className="w-3 h-3 mr-1" />
                                  В процессе
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{formatDate(item.completed_at)}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {item.notes || "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Method Create/Edit Dialog */}
      <Dialog open={methodDialogOpen} onOpenChange={setMethodDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {methodDialogMode === "create" ? "Новая методичка" : "Редактирование методички"}
            </DialogTitle>
            <DialogDescription>
              {methodDialogMode === "create" 
                ? "Заполните информацию о новой методичке" 
                : "Измените информацию о методичке"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="method_title">Название *</Label>
              <Input
                id="method_title"
                value={methodForm.title}
                onChange={(e) => setMethodForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Введите название методички"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="method_description">Описание</Label>
              <Textarea
                id="method_description"
                value={methodForm.description || ""}
                onChange={(e) => setMethodForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Краткое описание содержимого"
                className="mt-1"
              />
            </div>

            {/* Direction & Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Направление</Label>
                <Select
                  value={methodForm.direction}
                  onValueChange={(value) => setMethodForm(prev => ({ ...prev, direction: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">ИИ</SelectItem>
                    <SelectItem value="ml">Машинное обучение</SelectItem>
                    <SelectItem value="neural">Нейросети</SelectItem>
                    <SelectItem value="prompting">Промтинг</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Уровень сложности</Label>
                <Select
                  value={methodForm.level}
                  onValueChange={(value) => setMethodForm(prev => ({ ...prev, level: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Начальный</SelectItem>
                    <SelectItem value="intermediate">Средний</SelectItem>
                    <SelectItem value="advanced">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Icon & Format */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Иконка</Label>
                <Select
                  value={methodForm.icon_name}
                  onValueChange={(value) => setMethodForm(prev => ({ ...prev, icon_name: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FileText">Документ</SelectItem>
                    <SelectItem value="BookOpen">Книга</SelectItem>
                    <SelectItem value="Video">Видео</SelectItem>
                    <SelectItem value="Code">Код</SelectItem>
                    <SelectItem value="Brain">Мозг</SelectItem>
                    <SelectItem value="Cpu">Процессор</SelectItem>
                    <SelectItem value="Lightbulb">Лампочка</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Формат</Label>
                <Select
                  value={methodForm.format}
                  onValueChange={(value) => setMethodForm(prev => ({ ...prev, format: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Видео</SelectItem>
                    <SelectItem value="interactive">Интерактивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label htmlFor="method_tags">Теги (через запятую)</Label>
              <Input
                id="method_tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Python, API, GPT"
                className="mt-1"
              />
            </div>

            {/* File Upload */}
            <div>
              <Label>Файл</Label>
              <div className="mt-1 space-y-2">
                {methodForm.file_url && (
                  <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <File className="h-4 w-4" />
                    <span className="text-sm truncate flex-1">{methodForm.file_name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(methodForm.file_size)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMethodForm(prev => ({
                        ...prev,
                        file_url: null,
                        file_name: null,
                        file_size: null,
                      }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingFile}
                    className="w-full"
                  >
                    {uploadingFile ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    {uploadingFile ? "Загрузка..." : "Загрузить файл"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Active status */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Опубликовано</Label>
                <p className="text-sm text-muted-foreground">
                  Методичка будет видна студентам
                </p>
              </div>
              <Switch
                checked={methodForm.is_active}
                onCheckedChange={(checked) => setMethodForm(prev => ({ ...prev, is_active: checked }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMethodDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveMethod} disabled={methodLoading}>
              {methodLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              {methodDialogMode === "create" ? "Создать" : "Сохранить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить методичку?</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить "{methodToDelete?.title}"? 
              Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteMethod}
              disabled={methodLoading}
            >
              {methodLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
