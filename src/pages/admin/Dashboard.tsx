import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Pencil, Trash, Image as ImageIcon, X, ListPlus, Search, Upload, LogOut } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, CategorySchema, Product, Category } from '../../types/store';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function ProductsManager({ products, categories, onAdd, onUpdate, onDelete, isEditing, setIsEditing, isCreating, setIsCreating }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const { register, control, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm<Product>({
    resolver: zodResolver(ProductSchema) as any,
    defaultValues: {
      images: [''],
      variations: [],
      price: 0,
      minQuantity: 1,
      stock: 0
    }
  });

  const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
    control,
    name: "variations"
  });

  const onSubmit = (data: Product) => {
    // Filter out empty images
    const validImages = data.images?.filter(img => img.trim() !== '') || [];
    
    if (validImages.length === 0) {
      toast.error('Adicione pelo menos uma imagem válida (URL ou upload)');
      return;
    }

    // Ensure variations have IDs
    const productData = {
      ...data,
      images: validImages,
      variations: data.variations?.map(v => ({
        ...v,
        id: v.id || uuidv4(),
        // Ensure options is an array if it came from a string input
        options: Array.isArray(v.options) ? v.options : (v.options as string).split(',').map((s: string) => s.trim()).filter(Boolean)
      }))
    };

    if (isEditing) {
      onUpdate(productData);
      setIsEditing(null);
    } else {
      onAdd({ ...productData, id: uuidv4() });
      setIsCreating(false);
    }
    reset();
  };

  const startEdit = (product: Product) => {
    setIsEditing(product.id);
    setIsCreating(false);
    reset(product);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const currentImages = getValues('images') || [];
          // Filter out empty strings if any, but keep at least one if it's the only one and empty (though logic below handles it)
          const validImages = currentImages.filter(img => img !== '');
          setValue('images', [...validImages, base64String]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const images = watch('images');

  const filteredProducts = products.filter((product: Product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gerenciar Produtos</h2>
        {!isCreating && !isEditing && (
          <button
            onClick={() => { setIsCreating(true); reset({ images: [''], variations: [] }); }}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </button>
        )}
      </div>

      {!isCreating && !isEditing && (
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
          />
        </div>
      )}

      {(isCreating || isEditing) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
            <button onClick={() => { setIsCreating(false); setIsEditing(null); }} className="text-zinc-400 hover:text-zinc-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">SKU</label>
                <input {...register('sku')} className="w-full px-3 py-2 border rounded-lg" placeholder="Ex: CAM-001" />
                {errors.sku && <span className="text-red-500 text-xs">{errors.sku.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nome do Produto</label>
                <input {...register('name')} className="w-full px-3 py-2 border rounded-lg" />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Preço (R$)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  {...register('price')} 
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Categoria</label>
                <select {...register('categoryId')} className="w-full px-3 py-2 border rounded-lg">
                  <option value="">Selecione...</option>
                  {categories.map((c: Category) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <span className="text-red-500 text-xs">{errors.categoryId.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Qtd. Mínima</label>
                <input 
                  type="number" 
                  {...register('minQuantity')} 
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.minQuantity && <span className="text-red-500 text-xs">{errors.minQuantity.message}</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Estoque Atual</label>
                <input 
                  type="number" 
                  {...register('stock')} 
                  className="w-full px-3 py-2 border rounded-lg" 
                />
                {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Descrição</label>
              <textarea {...register('description')} className="w-full px-3 py-2 border rounded-lg h-24" />
              {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
            </div>

            {/* Variations Section */}
            <div className="border-t border-zinc-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-700">Variações (Cor, Tamanho, etc)</label>
                <button
                  type="button"
                  onClick={() => appendVariation({ id: uuidv4(), name: '', options: [] })}
                  className="text-sm text-amber-600 font-medium hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Adicionar Variação
                </button>
              </div>
              
              <div className="space-y-3">
                {variationFields.map((field, index) => (
                  <div key={field.id} className="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-zinc-500 uppercase">Variação {index + 1}</span>
                      <button type="button" onClick={() => removeVariation(index)} className="text-red-500 hover:text-red-700">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <input
                          {...register(`variations.${index}.name` as const)}
                          placeholder="Nome (ex: Tamanho)"
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.variations?.[index]?.name ? 'border-red-500' : ''}`}
                        />
                        {errors.variations?.[index]?.name && (
                          <span className="text-red-500 text-xs mt-1 block">{errors.variations[index]?.name?.message}</span>
                        )}
                      </div>
                      <div>
                        <input
                          {...register(`variations.${index}.options` as const)}
                          placeholder="Opções separadas por vírgula (ex: P, M, G)"
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${errors.variations?.[index]?.options ? 'border-red-500' : ''}`}
                        />
                        {errors.variations?.[index]?.options ? (
                          <span className="text-red-500 text-xs mt-1 block">{errors.variations[index]?.options?.message}</span>
                        ) : (
                          <p className="text-xs text-zinc-400 mt-1">Separe as opções por vírgula</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {variationFields.length === 0 && (
                  <p className="text-sm text-zinc-400 italic">Nenhuma variação adicionada.</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-700">Imagens</label>
                <div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="cursor-pointer bg-zinc-100 hover:bg-zinc-200 text-zinc-600 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Fotos Locais
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                {images?.map((_, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="w-10 h-10 bg-zinc-100 rounded overflow-hidden flex-shrink-0">
                      {images[index] ? (
                        <img src={images[index]} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-zinc-400 m-auto" />
                      )}
                    </div>
                    <input 
                      {...register(`images.${index}`)} 
                      placeholder="https://..." 
                      className="w-full px-3 py-2 border rounded-lg" 
                    />
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => {
                          const newImages = [...images];
                          newImages.splice(index, 1);
                          setValue('images', newImages);
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {images && images.length < 10 && (
                  <button 
                    type="button" 
                    onClick={() => setValue('images', [...images, ''])}
                    className="text-sm text-amber-600 font-medium hover:underline"
                  >
                    + Adicionar outra URL
                  </button>
                )}
              </div>
              {errors.images && <span className="text-red-500 text-xs">{errors.images.message}</span>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              {Object.keys(errors).length > 0 && (
                <div className="text-red-500 text-sm flex items-center mr-auto font-medium">
                  Preencha os campos obrigatórios corretamente.
                </div>
              )}
              <button 
                type="button" 
                onClick={() => { setIsCreating(false); setIsEditing(null); }}
                className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800"
              >
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="grid gap-4">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100">
                {product.images[0] ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">{product.name}</h3>
                <p className="text-sm text-zinc-500">
                  SKU: {product.sku} • {categories.find((c: Category) => c.id === product.categoryId)?.name} • R$ {product.price.toFixed(2)}
                </p>
                {product.variations && product.variations.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    {product.variations.map((v: any) => (
                      <span key={v.id} className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-600">
                        {v.name}: {Array.isArray(v.options) ? v.options.join(', ') : v.options}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(product)} className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                <Pencil className="w-5 h-5" />
              </button>
              <button onClick={() => onDelete(product.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </div>
  );
}

function CategoriesManager({ categories, onAdd, onUpdate, onDelete, isEditing, setIsEditing, isCreating, setIsCreating }: any) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Category>({
    resolver: zodResolver(CategorySchema)
  });

  const onSubmit = (data: Category) => {
    if (isEditing) {
      onUpdate(data);
      setIsEditing(null);
    } else {
      onAdd({ ...data, id: uuidv4(), slug: data.name.toLowerCase().replace(/\s+/g, '-') });
      setIsCreating(false);
    }
    reset();
  };

  const startEdit = (category: Category) => {
    setIsEditing(category.id);
    setIsCreating(false);
    setValue('id', category.id);
    setValue('name', category.name);
    setValue('slug', category.slug);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gerenciar Categorias</h2>
        {!isCreating && !isEditing && (
          <button
            onClick={() => { setIsCreating(true); reset(); }}
            className="flex items-center gap-2 bg-amber-500 text-zinc-900 px-4 py-2 rounded-lg font-bold hover:bg-amber-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Categoria
          </button>
        )}
      </div>

      {(isCreating || isEditing) && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 mb-8 max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{isEditing ? 'Editar Categoria' : 'Nova Categoria'}</h3>
            <button onClick={() => { setIsCreating(false); setIsEditing(null); }} className="text-zinc-400 hover:text-zinc-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nome da Categoria</label>
              <input {...register('name')} className="w-full px-3 py-2 border rounded-lg" />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button 
                type="button" 
                onClick={() => { setIsCreating(false); setIsEditing(null); }}
                className="px-4 py-2 text-zinc-600 hover:bg-zinc-100 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4 max-w-md">
        {categories.map((category: Category) => (
          <div key={category.id} className="bg-white p-4 rounded-xl border border-zinc-200 flex items-center justify-between">
            <span className="font-medium text-zinc-900">{category.name}</span>
            <div className="flex gap-2">
              <button onClick={() => startEdit(category)} className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                <Pencil className="w-5 h-5" />
              </button>
              <button onClick={() => onDelete(category.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { products, categories, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-zinc-900">Painel Administrativo</h1>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-lg border border-zinc-200">
            <button
              onClick={() => { setActiveTab('products'); setIsEditing(null); setIsCreating(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'products' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => { setActiveTab('categories'); setIsEditing(null); setIsCreating(false); }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'categories' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              Categorias
            </button>
          </div>
        </div>

        {activeTab === 'products' ? (
          <ProductsManager
            products={products}
            categories={categories}
            onAdd={addProduct}
            onUpdate={updateProduct}
            onDelete={deleteProduct}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        ) : (
          <CategoriesManager
            categories={categories}
            onAdd={addCategory}
            onUpdate={updateCategory}
            onDelete={deleteCategory}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isCreating={isCreating}
            setIsCreating={setIsCreating}
          />
        )}
      </div>
    </div>
  );
}
